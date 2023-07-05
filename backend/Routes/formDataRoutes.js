const express = require("express");
const router = express.Router();

const { postData, getData } = require("../Controller/formDataController");

router.get("/:eventName", getData);

// router.get("/:id", getFormById);

router.post("/", postData);

module.exports = router;
