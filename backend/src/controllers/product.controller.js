const { validationResult } = require("express-validator");
const Product = require("../models/Product");

// GET /api/products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/products/:id
async function getProductById(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/products
async function createProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, stock, category } = req.body;

  try {
    const product = await Product.create({ name, description, price, stock, category });
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /api/products/:id
async function updateProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // only pick the fields we expect — don't let req.body pass _id or __v through
  const { name, description, price, stock, category } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /api/products/:id
async function deleteProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
