var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/";

MongoClient.connect(process.env.PORT, function (err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.createCollection("userData", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
