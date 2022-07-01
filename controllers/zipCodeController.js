const { readConstant } = require("../lib/utils");

module.exports.zipcode_details = async (req, res) => {
  const { zipCode } = req.params;
  try {
    const data = await readConstant("zip_codes");
    if (!zipCode in data) throw new Error();
    res.json(data[zipCode]);
  } catch (e) {
    res.sendStatus(404);
  }
};
