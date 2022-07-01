const { Animal } = require("../models/Animal");

exports.animal_create_get = async (req, res) => {
  res.render("animal_form", { title: "Crear Animal" });
};

exports.animal_create_post = async (req, res) => {
  try {
    const animal = new Animal(req.body);
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
