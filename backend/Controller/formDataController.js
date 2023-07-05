const MongoClient = require("mongodb").MongoClient;

const postData = async (req, res) => {
  try {
    await MongoClient.connect(process.env.MONGO_URL)
      .then((db) => {
        var eventName = req.body.eventName;
        var dbo = db.db("test");
        dbo.collection(`${eventName}`).insertOne(req.body);
      })
      .catch((error) => {
        console.log(error);
      });
    res.status(200).json({ db: `${req.body.eventName}`, status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  try {
    await MongoClient.connect(process.env.MONGO_URL)
      .then((db) => {
        var { eventName } = req.params;
        var dbo = db.db("test");
        dbo
          .collection(`${eventName}`)
          .find()
          .toArray()
          .then((documents) => {
            // console.log(documents);
            res
              .status(200)
              .json({ db: `${eventName}`, status: "success", data: documents });
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({ error: error.message });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postData,
  getData,
};
