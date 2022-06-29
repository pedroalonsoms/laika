import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
  street: String,
  houseNumber: Number,
  neighborhood: String,
  city: String,
  state: String,
  country: String,
});

export const Adress = mongoose.model("Address", addressSchema);
