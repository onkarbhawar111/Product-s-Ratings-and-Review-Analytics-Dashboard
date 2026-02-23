const express = require("express");
const multer = require("multer");
const { uploadExcel } = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-excel", upload.single("file"), uploadExcel);

module.exports = router;
