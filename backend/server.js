require("dotenv").config();
const express = require("express");
const app = express();
const noticeRoute = require("./Routes/noticeRoutes");
const userRoute = require("./Routes/userRoutes");
const formRoute = require("./Routes/formRoutes");
const formDataRoute = require("./Routes/formDataRoutes");
const mongoose = require("mongoose");
// var MongoClient = require("mongodb").MongoClient;

// console.log("sdfghjkkjhgfxfufxcgicghihcvhjkjhb");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening to port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// MongoClient.connect(process.env.MONGO_URL)
//   .then((db) => {
//     var dbo = db.db("test");
//     // console.log("qwertyuiolkjhgfx");
//     dbo.createCollection("userData", () => {
//       console.log("Collection created!");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// MongoClient.connect(process.env.MONGO_URL, function (err, db) {
//   console.log("qwertyuiop");
//   if (err) console.log(err);
//   var dbo = db.db("test");
//   dbo.createCollection("userData", function (err, res) {
//     if (err) console.log(err);
//     console.log("Collection created!");
//     db.close();
//   });
// });

app.use(express.json());

app.use("/api/notices", noticeRoute);
app.use("/api/user", userRoute);
app.use("/api/form", formRoute);
app.use("/api/formData", formDataRoute);
