const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/uploadRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const analyticsRoutes = require("./routes/analyticsRoutes");
const productRoutes = require("./routes/productRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
