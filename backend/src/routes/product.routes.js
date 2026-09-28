const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const authenticate = require("../middleware/authenticate");
const { productValidation, idParamValidation } = require("../validators/product.validators");

router.get("/", getAllProducts);
router.get("/:id", idParamValidation, getProductById);
router.post("/", authenticate, productValidation, createProduct);
router.put("/:id", authenticate, idParamValidation, productValidation, updateProduct);
router.delete("/:id", authenticate, idParamValidation, deleteProduct);

module.exports = router;
