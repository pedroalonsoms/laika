const mongoose = require("mongoose");

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
    neighborhood: String,
    zipCode: String,
    by: String,
    organization: String,
    notes: String,
  },
  adopted: [
    {
      startDate: Date,
      endDate: Date,
      by: String,
      address: String,
    },
  ],
  events: [{ date: Date, description: String }],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = { animalSchema, Animal };
