const { Animal } = require("../models/animal_");
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

  show = async (req, res) => {
    const { animal_id, id } = req.params;
    const { homes } = await Animal.findById(animal_id);
    const home = homes.find(({ _id }) => _id.toString() === id);
    this.render(req, res, "show", { home });
  };

  create = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.homes.push({ ...req.body, leaving_age: animal.age });
    await animal.save();
    res.redirect(`/animals/${animal_id}/homes`);
  };

  edit = async (req, res) => {
    const { animal_id, id } = req.params;
    const { homes } = await Animal.findById(animal_id);
    const home = homes.find(({ _id }) => _id.toString() === id);
    this.render(req, res, "edit", { home });
  };

  update = async (req, res) => {
    const { animal_id, id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.homes = animal.homes.map((home) => {
      const { _id } = home;
      if (_id.toString() === id) return { ...home, ...req.body };
      return home;
    });
    await animal.save();
    res.redirect(`/animals/${animal_id}/homes/${id}`);
  };

  delete = async (req, res) => {
    const { animal_id, id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.homes = animal.homes.filter(({ _id }) => _id.toString() !== id);
    await animal.save();
    res.redirect(`/animals/${animal_id}/homes`);
  };
}

module.exports = HomesController;
