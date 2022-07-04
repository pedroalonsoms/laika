const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  municipality: {
    type: String,
    required: true,
    enum: {
      values: [
        "Ahome",
        "Angostura",
        "Badiraguato",
        "Concordia",
        "Cosalá",
        "Culiacán",
        "Choix",
        "Elota",
        "Escuinapa",
        "El Fuerte",
        "Guasave",
        "Mazatlán",
        "Mocorito",
        "Rosario",
        "Salvador Alvarado",
        "San Ignacio",
        "Sinaloa",
        "Navolato",
      ],
    },
  },
  zip_code: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address, addressSchema };
