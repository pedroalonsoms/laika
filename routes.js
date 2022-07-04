const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const _AnimalsController = require("./controllers/animals_controller");
const AnimalsController = new _AnimalsController();
router.get("/animals", AnimalsController.index);
router.post("/animals", upload.array("photos"), AnimalsController.create);
router.get("/animals/new", AnimalsController.new);
router.get("/animals/:id", AnimalsController.show);
router.get("/animals/:id/edit", AnimalsController.edit);
router.post(
  "/animals/:id/update",
  upload.array("photos"),
  AnimalsController.update
);
router.get("/animals/:id/delete", AnimalsController.delete);

const _RescuesController = require("./controllers/rescues_controller");
const RescuesController = new _RescuesController();
router.get("/animals/:animal_id/rescue", RescuesController.show);
router.post("/animals/:animal_id/rescue", RescuesController.create);
router.get("/animals/:animal_id/rescue/new", RescuesController.new);

module.exports = router;
