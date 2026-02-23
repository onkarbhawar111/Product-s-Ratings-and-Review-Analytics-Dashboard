const { parseExcelAndSave } = require("../services/excelService");

exports.uploadExcel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const result = await parseExcelAndSave(req.file.buffer);

    res.json({
      message: "File processed successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};
