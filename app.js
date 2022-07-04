const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");
const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  app.set("view engine", "ejs");

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static("public"));
  app.use("/", router);

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

main();
