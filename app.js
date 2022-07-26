require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const router = require("./routes");

const PORT = 8080;

const main = async () => {
  // Mongo connection
  const client = (
    await mongoose.connect(process.env.MONGO_URI)
  ).connection.getClient();

  // Sessions
  app.use(
    session({
      store: MongoStore.create({ client }),
      name: "qid",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  app.set("view engine", "ejs");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("public"));
  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main();
