const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  forgetPassword,
  verifyOTP,
} = require("../Controller/userController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgetPassword", forgetPassword);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
