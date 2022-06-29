const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/app");

  const animal_controller = require("../controllers/animalController");
  router.get("/animals/add", animal_controller.animal_create_get);
  router.post("/animals/add", animal_controller.animal_create_post);
};

main();
module.exports = router;
