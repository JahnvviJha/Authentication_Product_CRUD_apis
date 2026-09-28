const { body, param } = require("express-validator");

const productValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];

const idParamValidation = [
  param("id").isMongoId().withMessage("Invalid product ID"),
];

module.exports = { productValidation, idParamValidation };
