const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  municipality: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

module.exports = { addressSchema };
