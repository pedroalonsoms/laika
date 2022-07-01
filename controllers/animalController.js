const { Animal } = require("../models/Animal");
const { saveImages } = require("../lib/utils");

exports.animal_create_get = async (req, res) => {
  res.render("animal_form", { title: "Crear Animal" });
};

exports.animal_create_post = async (req, res) => {
  try {
    const { years, months } = req.body.rescued.ageInMonths;
    req.body.rescued.ageInMonths = parseInt(years) * 12 + parseInt(months);

    const urls = await saveImages(req.files);

    const animal = new Animal({ ...req.body, photos: urls });
    await animal.save();
    res.redirect("/animals");
  } catch (e) {
    res.render("error", { title: "Error", error: e.message });
  }
};

exports.animal_list = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.render("animal_list", { title: "Lista de Animales", animals });
  } catch (e) {
    res.render("error", { title: "Error", error: "Unknown error" });
  }
};

exports.animal_delete = async (req, res) => {
  try {
    const animal_id = req.params.id;
    await Animal.findByIdAndDelete(animal_id);
    res.redirect("back");
  } catch (e) {
    res.render("error", { title: "Error", error: e.message });
  }
};
