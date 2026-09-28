const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite dev server
  credentials: true,              // allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
