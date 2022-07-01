const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  municipality: String,
  zipCode: String,
  neighborhood: String,
});

const animalSchema = new mongoose.Schema({
  names: [String],
  photos: [String],
  sex: String,
  type: String,
  status: String,
  particularSigns: String,
  rescued: {
    ageInMonths: Number,
    date: Date,
    address: addressSchema,
    by: String,
    organization: String,
    notes: String,
  },
  adopted: [
    {
      startDate: Date,
      endDate: Date,
      by: String,
      address: addressSchema,
    },
  ],
  medicalAppointments: [Date],
  history: [{ date: Date, description: String }],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = { animalSchema, Animal };
