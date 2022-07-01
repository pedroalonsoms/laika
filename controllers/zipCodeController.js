const { readConstant } = require("../lib/utils");

module.exports.zipcode_details = async (req, res) => {
  const { zipCode } = req.params;
  try {
    const data = await readConstant("zip_codes");
    res.json(data[zipCode]["neighborhoods"]);
  } catch (e) {
    res.sendStatus(404);
  }
};
