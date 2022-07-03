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
router.post("/animals/:id/update", AnimalsController.update);
router.get("/animals/:id/delete", AnimalsController.delete);

module.exports = router;
