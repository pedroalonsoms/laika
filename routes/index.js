const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
router.get("/users", user_controller.user_list);
router.get("/users/add", user_controller.user_create_get);
router.post("/users/add", user_controller.user_create_post);
router.get("/users/:id/delete", user_controller.user_delete);

const animal_controller = require("../controllers/animalController");
router.get("/animals", animal_controller.animal_list);
router.get("/animals/add", animal_controller.animal_create_get);
router.post("/animals/add", animal_controller.animal_create_post);

module.exports = router;
