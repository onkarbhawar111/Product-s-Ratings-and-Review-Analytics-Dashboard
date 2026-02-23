const pool = require("../config/db");

exports.getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      rating,
    } = req.query;

    const offset = (page - 1) * limit;

    let conditions = [];
    let values = [];
    let index = 1;

    if (search) {
      conditions.push(`name ILIKE $${index++}`);
      values.push(`%${search}%`);
    }

    if (category) {
      conditions.push(`category = $${index++}`);
      values.push(category);
    }

    if (rating) {
      conditions.push(`rating >= $${index++}`);
      values.push(rating);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const totalQuery = `
      SELECT COUNT(*) FROM products
      ${whereClause}
    `;

    const dataQuery = `
      SELECT * FROM products
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${index++} OFFSET $${index}
    `;

    values.push(limit, offset);

    const totalResult = await pool.query(totalQuery, values.slice(0, index - 2));
    const dataResult = await pool.query(dataQuery, values);

    res.json({
      total: parseInt(totalResult.rows[0].count),
      page: parseInt(page),
      limit: parseInt(limit),
      data: dataResult.rows,
    });
  } catch (err) {
    next(err);
  }
};
