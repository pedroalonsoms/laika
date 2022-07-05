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
        required: true,
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
  events: [
    {
      date: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
        enum: {
          values: [
            "Se detectó Atropellamiento",
            "Se detectó TVT",
            "Se detectó Sarna/Piel",
            "Se detectó Viral",
            "Se detectó Embarazo",
            "Se detectó Cachorros",
            "Se detectó Homeoparásitos",
            "Se detectó Sarna",
            "Se detectó Viral",
            "Se detectó Anemia",
            "Se realizó Esterilización",
            "Se realizó Desparasitación",
            "Se realizó Biometría Hemática",
            "Se aplicó Pastilla Simpárica",
            "Se aplicó Vacuna Puppy",
            "Se aplicó Vacuna Refuerzo Puppy",
            "Se aplicó Vacuna Múltiple",
            "Se aplicó Vacuna Refuerzo Múltiple",
            "Se aplicó Vacuna Rabia",
            "Se aplicó Vacuna Triple Viral Felina",
            "Se aplicó Vacuna Leucemia",
          ],
        },
      },
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = { Animal };
