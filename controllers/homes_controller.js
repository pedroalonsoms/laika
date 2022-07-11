const { Animal } = require("../models/animal");
const { Address } = require("../models/address");

class HomesController {
  render = (req, res, filename, other) => {
    res.render(`./homes/${filename}`, { req, Animal, Address, ...other });
  };

  index = async (req, res) => {
    const { animal_id } = req.params;
    const { homes } = await Animal.findById(animal_id);
    this.render(req, res, "index", { homes });
  };

  new = async (req, res) => {
    this.render(req, res, "new");
  };

  create = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.homes.push(req.body);
    await animal.save();
    res.redirect(`/animals/${animal_id}/homes`);
  };

  delete = async (req, res) => {
    const { animal_id, id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.homes = animal.homes.filter(({ _id }) => _id.toString() !== id);
    await animal.save();
    res.redirect("back");
  };
}

module.exports = HomesController;
