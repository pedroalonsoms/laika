const mongoose = require("mongoose");
const { addressSchema } = require("./address");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  alias: String,
  photos: [String],
  sex: {
    type: String,
    required: true,
    enum: {
      values: ["Macho", "Hembra"],
    },
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["Perro", "Gato", "Otro"],
    },
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Activo", "Adoptado", "Fallecido"],
    },
  },
  particular_signs: String,
  rescue: {
    type: {
      date: {
        type: Date,
        required: true,
      },
      address: {
        type: addressSchema,
        required: true,
      },
      rescuers: {
        type: String,
        required: true,
      },
      organization: {
        type: String,
        enum: {
          values: ["Laika", "Otra"],
        },
      },
      notes: String,
    },
    required: false,
  },
  adopted: [
    {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
      by: {
        type: String,
        required: true,
      },
      address: {
        type: addressSchema,
        required: true,
      },
    },
  ],
  medicalAppointments: [
    {
      type: Date,
      required: true,
    },
  ],
  history: [
    {
      date: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = { Animal };
