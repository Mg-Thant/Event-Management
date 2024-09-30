const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      throw new Error("Unauthorized access");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = protect;
