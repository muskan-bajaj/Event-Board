const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  forgetPassword,
  verifyOTP,
  resetPassword,
} = require("../Controller/userController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgetPassword", forgetPassword);
router.post("/verifyOTP", verifyOTP);
router.post("/updatePassword", resetPassword);

module.exports = router;
