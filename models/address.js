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
  zip_code: String,
  neighborhood: String,
  street: String,
});

addressSchema.virtual("fullAddress").get(function () {
  let fullAddress = "";

  if (this.municipality) fullAddress += `${this.municipality} `;
  if (this.zip_code) fullAddress += `CP: ${this.zip_code} `;
  if (this.neighborhood) fullAddress += `Col: ${this.neighborhood} `;
  if (this.street) fullAddress += `${this.street}`;

  return fullAddress;
});

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address, addressSchema };
