const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//Hack for async error handling
require("express-async-errors");

const _AnimalsController = require("./controllers/animals_controller");
const AnimalsController = new _AnimalsController();
router.get("/animals/search", AnimalsController.search);
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
router.get("/animals/:animal_id/rescue/edit", RescuesController.edit);
router.post("/animals/:animal_id/rescue/update", RescuesController.update);
router.get("/animals/:animal_id/rescue/delete", RescuesController.delete);

const _EventsController = require("./controllers/events_controller");
const EventsController = new _EventsController();
router.get("/animals/:animal_id/events", EventsController.index);
router.get("/animals/:animal_id/events/new", EventsController.new);
router.post("/animals/:animal_id/events", EventsController.create);
router.get("/animals/:animal_id/events/:id/delete", EventsController.delete);

const _AppointmentsController = require("./controllers/appointments_controller");
const AppointmentsController = new _AppointmentsController();
router.get("/animals/:animal_id/appointments", AppointmentsController.index);
router.get("/animals/:animal_id/appointments/new", AppointmentsController.new);
router.post("/animals/:animal_id/appointments", AppointmentsController.create);
router.get(
  "/animals/:animal_id/appointments/:id/delete",
  AppointmentsController.delete
);

const _AdoptionsController = require("./controllers/adoptions_controller");
const AdoptionsController = new _AdoptionsController();
router.get("/animals/:animal_id/adoptions", AdoptionsController.index);
router.get("/animals/:animal_id/adoptions/new", AdoptionsController.new);
router.post("/animals/:animal_id/adoptions", AdoptionsController.create);
router.get(
  "/animals/:animal_id/adoptions/:id/delete",
  AdoptionsController.delete
);

const _CalendarController = require("./controllers/calendar_controller");
const CalendarController = new _CalendarController();
router.get("/calendar", CalendarController.show);

const _NeighborhoodsController = require("./controllers/neighborhoods_controller");
const NeighborhoodsController = new _NeighborhoodsController();
router.get("/neighborhoods/:zip_code", NeighborhoodsController.details);

// Any unmatch redirects to main page
router.all("*", (req, res) => {
  res.redirect("/animals");
});

// Error handling
router.use((error, req, res, next) => {
  res.status(403);
  res.render("error", { error });
  next(error);
});

module.exports = router;
