const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT | 3000;

const main = async () => {
  // Database
  await mongoose.connect("mongodb://127.0.0.1:27017/app");

  // Templates
  app.set("view engine", "ejs");

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("./public"));

  // Routers
  const router = require("./routes/index");
  app.use("/", router);

  app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}`));

  app.locals.utils = require("./lib/utils");
};

main();
