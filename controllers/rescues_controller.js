const { Animal } = require("../models/animal");
const { Address } = require("../models/address");

class RescuesController {
  render = (req, res, filename, other) => {
    res.render(`./rescues/${filename}`, { Animal, Address, req, ...other });
  };

  show = async (req, res) => {
    const { rescue } = await Animal.findById(req.params.animal_id);
    this.render(req, res, "show", { rescue });
  };

  new = async (req, res) => {
    this.render(req, res, "new");
  };

  create = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.rescue = req.body;
    await animal.save();
    res.redirect(`/animals/${animal_id}/rescue`);
  };

  edit = async (req, res) => {
    const { rescue } = await Animal.findById(req.params.animal_id);
    this.render(req, res, "edit", { rescue });
  };

  update = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.rescue = req.body;
    await animal.save();
    res.redirect(`/animals/${animal_id}/rescue`);
  };

  delete = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.rescue = undefined;
    await animal.save();
    res.redirect(`/animals/${animal_id}/rescue`);
  };
}

module.exports = RescuesController;
