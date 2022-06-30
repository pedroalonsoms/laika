const fs = require("fs/promises");

module.exports.neighborhoods_from_zipcode = async (req, res) => {
  const { zipCode } = req.params;
  try {
    const data = JSON.parse(
      await fs.readFile("./constants/sinaloa_zip_codes.json", "utf8")
    );
    if (!(zipCode in data)) throw new Error("Invalid zipCode");
    res.json(data[zipCode]);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
