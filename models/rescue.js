const mongoose = require("mongoose");
const { milisecondsToAge } = require("../lib/utils");
const { addressSchema } = require("./address");

const rescueSchema = new mongoose.Schema({
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
      values: ["Laika", "Ciudadano"],
    },
  },
});

rescueSchema.virtual("age").get(function () {
  const { date: rescue_date } = this;
  const { birth_date } = this.parent();

  if (birth_date === undefined) return "";
  return milisecondsToAge(rescue_date - birth_date);
});

const Rescue = mongoose.model("Rescue", rescueSchema);
module.exports = { Rescue, rescueSchema };
