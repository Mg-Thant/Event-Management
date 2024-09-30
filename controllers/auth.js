const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const isExistUser =
      (await User.findOne({ username })) || (await User.findOne({ email }));
    if (isExistUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatched = await bcrypt.compare(password, user.password);

    if (!user || !isMatched) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    return res.status(200).json({ token, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};
