const mongoose = require("mongoose");
const { milisecondsToAge } = require("../lib/utils");
const { homeSchema } = require("./home");
const { rescueSchema } = require("./rescue");

const catVaccines = [
  "Se aplicó Vacuna Triple Viral Felina",
  "Se aplicó Vacuna Refuerzo TV Felina",
  "Se aplicó Vacuna Leucemia",
  "Se aplicó Vacuna Desparasitación",
  "Se aplicó Vacuna Rabia",
];
const dogVaccines = [
  "Se aplicó Vacuna Puppy",
  "Se aplicó Vacuna Refuerzo Puppy",
  "Se aplicó Vacuna Múltiple",
  "Se aplicó Vacuna Refuerzo Múltiple",
  "Se aplicó Vacuna Rabia",
];

const vaccines = new Set([...catVaccines, ...dogVaccines]);

const animalSchema = new mongoose.Schema({
  petco_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  alias: String,
  birth_date: {
    type: Date,
    required: true,
  },
  species: {
    type: String,
    required: true,
    enum: {
      values: ["Perro", "Gato", "Otro"],
    },
  },
  color: {
    type: String,
    required: true,
    enum: {
      values: [
        "Blanco",
        "Negro",
        "Café",
        "Parcino",
        "Siamés",
        "Atigrado",
        "Otro",
      ],
    },
  },
  sex: {
    type: String,
    required: true,
    enum: {
      values: ["Macho", "Hembra", "Otro"],
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
  photos: [String],
  rescue: rescueSchema,
  homes: [homeSchema],
  appointments: [
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
            ...vaccines,
          ],
        },
      },
    },
  ],
});

animalSchema.virtual("age").get(function () {
  const today = new Date();
  const { birth_date } = this;

  return milisecondsToAge(today - birth_date);
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = { Animal, catVaccines, dogVaccines };
