const mongoose = require("mongoose");
const { addressSchema } = require("./address");
const { adoptionSchema } = require("./adoption");

const animalSchema = new mongoose.Schema({
  petco_id: Number,
  name: {
    type: String,
    required: true,
  },
  alias: String,
  type: {
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
      values: ["Blanco", "Negro", "Café", "Otro"],
    },
  },
  sex: {
    type: String,
    required: true,
    enum: {
      values: ["Macho", "Hembra"],
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
      rescuers: String,
      organization: {
        type: String,
        required: true,
        enum: {
          values: ["Laika", "Otra"],
        },
      },
    },
  },
  adoptions: [adoptionSchema],
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

animalSchema.virtual("calendarList").get(function () {
  const calendarList = [];

  //Adding Medical Appointments
  this.appointments?.forEach((appointment) => {
    calendarList.push({
      description: "Cita médica",
      from: this,
      date: appointment?.date,
    });
  });

  //Adding Adoptions
  this.adoptions?.forEach((adoption) => {
    const _type = `${adoption?.type?.toLowerCase()}`;

    calendarList.push({
      description: `Inicia adopción ${_type}`,
      from: this,
      date: adoption?.start_date,
    });

    if (_type === "temporal") {
      calendarList.push({
        description: `Termina adopción ${_type}`,
        from: this,
        date: adoption?.end_date,
      });
    }
  });

  return calendarList;
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = { Animal };
