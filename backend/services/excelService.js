const XLSX = require("xlsx");
const pool = require("../config/db");

const cleanNumber = (value) => {
  if (!value) return null;

  // Take first value before pipe if exists
  const firstPart = value.toString().split("|")[0];

  const cleaned = firstPart
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .replace(/%/g, "")
    .trim();

  if (cleaned === "") return null;

  const num = Number(cleaned);
  return isNaN(num) ? null : num;
};

exports.parseExcelAndSave = async (buffer) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    let productsInserted = 0;
    let reviewsInserted = 0;

    
    for (const row of rows) {
       const productId = row.product_id;
  if (!productId) continue;

  const mainCategory = row.category?.split("|")[0] || "Unknown";

  const discountedPrice = cleanNumber(row.discounted_price);
  const actualPrice = cleanNumber(row.actual_price);
  const discountPercentage = cleanNumber(row.discount_percentage);
  const rating = cleanNumber(row.rating);

  const ratingCountRaw = cleanNumber(row.rating_count);
  const ratingCount =
    ratingCountRaw !== null ? Math.floor(ratingCountRaw) : null;

  const result = await client.query(
    `INSERT INTO products 
    (product_id, name, category, discounted_price, actual_price, discount_percentage, rating, rating_count, description)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (product_id) DO NOTHING`,
    [
      productId,
      row.product_name,
      mainCategory,
      discountedPrice,
      actualPrice,
      discountPercentage,
      rating,
      ratingCount,
      row.about_product,
    ]
  );

  if (result.rowCount > 0) {
    productsInserted++;
  }


      // Reviews
      const users = (row.user_name || "").split(",");
      const titles = (row.review_title || "").split(",");
      const contents = (row.review_content || "").split(",");

      for (let i = 0; i < users.length; i++) {
        if (!users[i]) continue;

        await client.query(
          `INSERT INTO reviews (product_id, user_name, review_title, review_content)
           VALUES ($1,$2,$3,$4)`,
          [productId, users[i], titles[i] || null, contents[i] || null]
        );

        reviewsInserted++;
      }
    }

    await client.query("COMMIT");

    return { productsInserted, reviewsInserted };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};