const { Animal } = require("../models/animal");
const { Event, catVaccines, dogVaccines } = require("../models/event");

class EventsController {
  render = (req, res, filename, other) => {
    res.render(`./events/${filename}`, { req, ...other });
  };

  index = async (req, res) => {
    // sorted by date
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    const events = animal.events.sort(({ date: a }, { date: b }) => a - b);
    this.render(req, res, "index", { events, catVaccines, dogVaccines });
  };

  new = async (req, res) => {
    const event = new Event();
    this.render(req, res, "new", { event });
  };

  create = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.events.push(req.body);
    await animal.save();
    res.redirect(`/animals/${animal_id}/events`);
  };

  delete = async (req, res) => {
    const { animal_id, id } = req.params;
    const animal = await Animal.findById(animal_id);
    // dont set array to undefined because push will crash
    animal.events = animal.events.filter(({ _id }) => _id.toString() !== id);
    await animal.save();
    res.redirect("back");
  };
}

module.exports = EventsController;
