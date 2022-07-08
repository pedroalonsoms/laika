const { saveImages, removeEmpty } = require("../lib/utils");
const { Animal } = require("../models/animal");
const { Address } = require("../models/address");

class AnimalsController {
  render = (req, res, filename, other) => {
    res.render(`./animals/${filename}`, { Animal, Address, req, ...other });
  };

  index = async (req, res) => {
    const query = removeEmpty(req.query);

    if ("name_or_alias" in query) {
      query.$or = [
        { name: { $regex: query["name_or_alias"], $options: "i" } },
        { alias: { $regex: query["name_or_alias"], $options: "i" } },
      ];
      delete query["name_or_alias"];
    }

    const animals = await Animal.find(query);
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
    const urls = await saveImages(req.files);
    const animal = new Animal({ ...req.body, photos: urls });
    const { id } = await animal.save();
    res.redirect(`/animals/${id}`);
  };

  edit = async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    this.render(req, res, "edit", { animal });
  };

  update = async (req, res) => {
    const id = req.params.id;
    const urls = await saveImages(req.files);

    const animal = await Animal.findById(id);
    animal.set({ ...req.body, photos: [...animal?.photos, ...urls] });
    await animal.save();
    res.redirect(`/animals/${id}`);
  };

  delete = async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect("/animals");
  };

  search = async (req, res) => {
    this.render(req, res, "search");
  };
}

module.exports = AnimalsController;
