const express = require("express");
const router = express.Router();
const {
  getNotices,
  getNotice,
  postNotice,
  // deleteNotice,
  // updateNotice,
} = require("../Controller/noticeController");

router.get("/", getNotices);

router.get("/:id", getNotice);

router.post("/", postNotice);

// router.delete("/:id", deleteNotice);

// router.patch("/:id", updateNotice);

module.exports = router;
