const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");

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

module.exports = { login, signup };
