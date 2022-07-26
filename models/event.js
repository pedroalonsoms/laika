const mongoose = require("mongoose");

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

const eventSchema = new mongoose.Schema({
  date: {
    title: "Fecha",
    type: Date,
    required: true,
  },
  description: {
    title: "Descripción",
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
        "Se detectó Hemoparásitos",
        "Se detectó Sarna",
        "Se detectó Viral",
        "Se detectó Anemia",
        "Se realizó Esterilización",
        "Se realizó Desparasitación",
        "Se realizó Biometría Hemática",
        "Se aplicó Pastilla Simpárica",
        ...vaccines,
        "Otro",
      ],
    },
  },
  note: { title: "Notas", type: String },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event, eventSchema, catVaccines, dogVaccines };
