const fs = require("fs/promises");

module.exports.neighborhoods_from_zipcode = async (req, res) => {
  const { zipCode } = req.params;
  try {
    const sinaloa = JSON.parse(
      await fs.readFile("./constants/sinaloa.json", "utf8")
    );
    if (!(zipCode in sinaloa)) throw new Error("Invalid zipCode");
    res.json(sinaloa[zipCode]);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
