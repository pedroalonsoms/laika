const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  municipality: String,
  zipCode: String,
  neighborhood: String,
});

const Address = mongoose.model("Address", addressSchema);

module.exports = { addressSchema, Address };
