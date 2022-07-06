const mongoose = require("mongoose");
const { addressSchema } = require("./address");

const adoptionSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: Date,
  by: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

adoptionSchema.virtual("type").get(function () {
  if (!this.end_date) return "Permanente";
  return "Temporal";
});

const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = { Adoption, adoptionSchema };
