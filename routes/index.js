const express = require("express");
const router = express.Router();

const animal_controller = require("../controllers/animalController");
router.get("/animals", animal_controller.animal_list);
router.get("/animals/add", animal_controller.animal_create_get);
router.post("/animals/add", animal_controller.animal_create_post);
router.get("/animals/:id/delete", animal_controller.animal_delete);

const zipcode_controller = require("../controllers/zipCodeController");
router.get("/zipcode/:zipCode", zipcode_controller.zipcode_details);

module.exports = router;
