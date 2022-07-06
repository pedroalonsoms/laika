const { Animal } = require("../models/animal");
const { Address } = require("../models/address");

class AdoptionsController {
  render = (req, res, filename, other) => {
    res.render(`./adoptions/${filename}`, { req, Address, ...other });
  };

  index = async (req, res) => {
    const { animal_id } = req.params;
    const { adoptions } = await Animal.findById(animal_id);
    this.render(req, res, "index", { adoptions });
  };

  new = async (req, res) => {
    this.render(req, res, "new");
  };

  create = async (req, res) => {
    const { animal_id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.adoptions.push(req.body);
    await animal.save();
    res.redirect(`/animals/${animal_id}/adoptions`);
  };

  delete = async (req, res) => {
    const { animal_id, id } = req.params;
    const animal = await Animal.findById(animal_id);
    animal.adoptions = animal.adoptions.filter(
      ({ _id }) => _id.toString() !== id
    );
    await animal.save();
    res.redirect("back");
  };
}

module.exports = AdoptionsController;
