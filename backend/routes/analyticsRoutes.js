const express = require("express");
const {
  getProductsPerCategory,
  getTopReviewedProducts,
  getDiscountDistribution,
  getCategoryAverageRating,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/products-per-category", getProductsPerCategory);
router.get("/top-reviewed-products", getTopReviewedProducts);
router.get("/discount-distribution", getDiscountDistribution);
router.get("/category-average-rating", getCategoryAverageRating);

module.exports = router;
