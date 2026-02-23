const pool = require("../config/db");

exports.getProductsPerCategory = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT category, COUNT(*) AS total_products
      FROM products
      GROUP BY category
      ORDER BY total_products DESC
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getTopReviewedProducts = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT p.name, COUNT(r.id) AS total_reviews
      FROM products p
      JOIN reviews r ON p.product_id = r.product_id
      GROUP BY p.name
      ORDER BY total_reviews DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getDiscountDistribution = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        FLOOR(discount_percentage / 10) * 10 AS discount_bucket,
        COUNT(*) AS product_count
      FROM products
      GROUP BY discount_bucket
      ORDER BY discount_bucket
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getCategoryAverageRating = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT category, ROUND(AVG(rating), 2) AS avg_rating
      FROM products
      GROUP BY category
      ORDER BY avg_rating DESC
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
