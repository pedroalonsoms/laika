const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    title: "Fecha",
    type: Date,
    required: true,
  },
  description: {
    title: "Descripción",
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = { Appointment, appointmentSchema };
