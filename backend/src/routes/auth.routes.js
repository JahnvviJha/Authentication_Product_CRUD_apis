const express = require("express");
const router = express.Router();

const { register, login, refreshToken, logout, getMe } = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");
const { registerValidation, loginValidation } = require("../validators/auth.validators");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

module.exports = router;
