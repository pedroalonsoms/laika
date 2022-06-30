const mongoose = require("mongoose");
const { userSchema } = require("./User");

const animalSchema = new mongoose.Schema({
  names: [String],
  photos: [String],
  sex: String,
  type: String,
  color: String,
  status: String,
  particularSigns: String,
  rescued: {
    ageInMonths: Number,
    date: Date,
    address: String,
    by: [userSchema],
  },
  adopted: [
    {
      startDate: Date,
      endDate: Date,
      by: [userSchema],
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = { animalSchema, Animal };
