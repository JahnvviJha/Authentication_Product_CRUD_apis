const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  // expect: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}

module.exports = authenticate;
