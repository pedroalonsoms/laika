const _Animal = require("../models/Animal");
const Animal = new _Animal();

class AnimalsController {
  render = (req, res, filename, other) => {
    res.render(`./animals/${filename}`, { Animal, req, ...other });
  };

  index = async (req, res) => {
    const animals = await Animal.findAll();
    this.render(req, res, "index", { animals });
  };

  show = async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    this.render(req, res, "show", { animal });
  };

  new = async (req, res) => {
    this.render(req, res, "new");
  };

  create = async (req, res) => {
    const id = await Animal.create(req.body);
    await Animal.addPhotos(id, req.files);
    res.redirect(`/animals/${id}`);
  };

  edit = async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    this.render(req, res, "edit", { animal });
  };

  update = async (req, res) => {
    const id = req.params.id;
    await Animal.updateById(id, req.body);
    res.redirect(`/animals/${id}`);
  };

  delete = async (req, res) => {
    await Animal.deleteById(req.params.id);
    res.redirect("/animals");
  };
}

module.exports = AnimalsController;
