const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUpUser = async function (email, password) {
  //generating salt
  const salt = await bcrypt.genSalt(10);

  //hashing password
  const hash = await bcrypt.hash(password, salt);

  const newUser = await this.create({ email, password: hash });
  return newUser;
};

userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }
  const existingUser = await this.findOne({ email });
  if (!existingUser) {
    throw Error("Invalid login credentials");
  }
  const passwordVerification = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!passwordVerification) {
    throw Error("Invalid login credentials");
  }

  return existingUser;
};

module.exports = mongoose.model("authentication", userSchema);
