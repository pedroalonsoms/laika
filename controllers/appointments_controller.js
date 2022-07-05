const { Animal } = require("../models/animal");

class AppointmentsController {
  render = (req, res, filename, other) => {
    res.render(`./appointments/${filename}`, { req, ...other });
  };

  index = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    const appointments = animal.appointments.sort(
      ({ date: a }, { date: b }) => a - b
    );
    this.render(req, res, "index", { appointments });
  };

  new = async (req, res) => {
    this.render(req, res, "new");
  };

  create = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.appointments.push(req.body);
    await animal.save();
    res.redirect(`/animals/${animal_id}/appointments`);
  };

  delete = async (req, res) => {
    const { animal_id, id } = req.params;
    const animal = await Animal.findById(animal_id);
    // dont set array to undefined because push will crash
    animal.appointments = animal.appointments.filter(
      ({ _id }) => _id.toString() !== id
    );
    await animal.save();
    res.redirect("back");
  };
}

module.exports = AppointmentsController;
