const { Animal } = require("../models/animal");
const { Address } = require("../models/address");

class RescuesController {
  render = (req, res, filename, other) => {
    res.render(`./rescues/${filename}`, { Animal, Address, req, ...other });
  };

  show = async (req, res) => {
    const { rescue } = await Animal.findById(req.params.animal_id);
    this.render(req, res, "show", rescue);
  };

  new = async (req, res) => {
    this.render(req, res, "new");
  };

  create = async (req, res) => {
    res.redirect("../");
  };
}

module.exports = RescuesController;
