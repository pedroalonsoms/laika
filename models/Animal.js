import mongoose from "mongoose";
import { addressSchema } from "./Address";

export const animalSchema = new mongoose.Schema({
  names: [String],
  photos: [String],
  birthDate: Date,
  rescuedDate: Date,
  rescuedAddress: addressSchema,
  type: String,
  colors: [String],
  sex: String,
  status: String,
  particularSigns: String,
  rescuedBy: [userSchema],
  adoptions: [
    {
      startDate: Date,
      endDate: Date,
      adoptedBy: [userSchema],
    },
  ],
});

export const Animal = mongoose.model("Animal", animalSchema);
