const fs = require("fs/promises");

class NeighborhoodsController {
  details = async (req, res) => {
    const zip_code = req.params.zip_code;
    const data = JSON.parse(
      await fs.readFile("./db/neighborhoods/neighborhoods.json", "utf8")
    );

    if (!(zip_code in data)) return res.sendStatus(404);
    return res.json(data[zip_code]["neighborhoods"]);
  };
}

module.exports = NeighborhoodsController;
