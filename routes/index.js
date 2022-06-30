const express = require("express");
const router = express.Router();

const animal_controller = require("../controllers/animalController");
router.get("/animals", animal_controller.animal_list);
router.get("/animals/add", animal_controller.animal_create_get);
router.post("/animals/add", animal_controller.animal_create_post);

module.exports = router;
