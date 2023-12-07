const otpModel = require("../Models/otpModel");
const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

const login = async (req, res) => {
  const { email, password, id } = req.body;
  try {
    const user = await userSchema.loginUser(email, password);
    const jwtToken = createToken(user._id);
    const id = user._id;
    res.status(400).json({ email, jwtToken, id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userSchema.signUpUser(email, password);

    const jwtToken = createToken(user._id);

    res.status(200).json({ email, jwtToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    await userSchema.updateOne(
      { email: email },
      { password: hash },
      { upsert: false }
    );
    res.status(200).json({ mssg: "successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userSchema.findOne({ email: email });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpDoc = await otpModel.updateOne({ email, otp });
      res.status(200).json({ otpDoc, user: "valid" });
    } else {
      res.status(200).json({ user: "invalid" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await otpModel.findOne({ email: email });
    if (user.otp === otp) {
      res.status(200).json({ verified: "true" });
    }
    res.status(200).json({ verified: "false" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup, forgetPassword, verifyOTP, resetPassword };
