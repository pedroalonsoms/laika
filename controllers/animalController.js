const { Animal } = require("../models/Animal");

exports.animal_create_get = async (req, res) => {
  res.render("animal_form", { title: "Crear Animal" });
};

exports.animal_create_post = async (req, res) => {
  console.log(req.body);
  res.send("success");
};

exports.animal_list = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.render("animal_list", { title: "Lista de Animales", animals });
  } catch (e) {
    res.render("error", { title: "Error", error: "Unknown error" });
  }
};
