const noticeSchema = require("../Models/noticeModel");
const mongoose = require("mongoose");

const getNotices = async (req, res) => {
  const notice = await noticeSchema.find({}).sort({ createdAt: -1 });
  res.status(200).json(notice);
};

const getNotice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id invalid" });
  }
  const notice = await noticeSchema.findById(id);
  if (!notice) {
    return res.status(404).json({ error: "no such id" });
  }
  res.status(200).json(notice);
};

const postNotice = async (req, res) => {
  const { eventName, eventDes, date, poster } = req.body;
  try {
    const notice = await noticeSchema.create({
      eventName,
      eventDes,
      date,
      poster,
    });
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "invalid id" });
  }
  const notice = await noticeSchema.findOneAndDelete({ _id: id });
  if (!notice) {
    return res.status(404).json({ error: "id not found" });
  }
  res.status(200).json(notice);
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }
  const notice = await noticeSchema.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!notice) {
    return res.status(404).json(notice);
  }
  res.status(200).json(notice);
};

module.exports = {
  getNotices,
  getNotice,
  postNotice,
  deleteNotice,
  updateNotice,
};
