const express = require("express");
const router = express.Router();

const animal_controller = require("../controllers/animalController");
router.get("/animals", animal_controller.animal_list);
router.get("/animals/add", animal_controller.animal_create_get);
router.post("/animals/add", animal_controller.animal_create_post);

const neighborhoods_controller = require("../controllers/neighborhoodController");
router.get(
  "/neighborhoods/:zipCode",
  neighborhoods_controller.neighborhoods_from_zipcode
);

module.exports = router;
