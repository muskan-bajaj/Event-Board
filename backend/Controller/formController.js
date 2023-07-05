const formSchema = require("../Models/formModel");

const getForm = async (req, res) => {
  const form = await formSchema.find({}).sort({ createdAt: -1 });
  res.status(200).json(form);
};

const getFormById = async (req, res) => {
  const form = await formSchema.findById(req.params.id);
  res.status(200).json(form);
};

const postForm = async (req, res) => {
  const { userID, noticeID, formName, formDes, fields } = req.body;
  try {
    const form = await formSchema.create({
      userID,
      noticeID,
      formName,
      formDes,
      fields,
    });
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getForm,
  getFormById,
  postForm,
};
