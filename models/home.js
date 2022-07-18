const mongoose = require("mongoose");
const { milisecondsToAge } = require("../lib/utils");
const { addressSchema } = require("./address");

const homeSchema = new mongoose.Schema({
  start_date: {
    title: "Fecha de Partida",
    type: Date,
    required: true,
  },
  end_date: { title: "Fecha de Regreso", type: Date },
  keeper_name: {
    title: "Cuidado por",
    type: String,
    required: true,
  },
  keeper_phone: {
    title: "Teléfono",
    type: String,
  },
  keeper_contact: {
    title: "Contacto",
    type: String,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  note: { title: "Notas", type: String },
});

homeSchema.virtual("type").get(function () {
  if (!this.end_date) return "Permanente";
  return "Temporal";
});

homeSchema.virtual("leaving_age").get(function () {
  const { start_date } = this;
  const { birth_date } = this.parent();

  return milisecondsToAge(start_date - birth_date);
});

const Home = mongoose.model("Home", homeSchema);
module.exports = { Home, homeSchema };
