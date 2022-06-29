import mongoose from "mongoose";
import { addressSchema } from "./Address";

export const userSchema = new mongoose.Schema({
  fullname: { type: String, unique: true },
  phone: String,
  address: addressSchema,
  organization: String,
});

export const User = mongoose.model("User", userSchema);
