const { Animal } = require("../models/animal");

class CalendarController {
  render = (req, res, filename, other) => {
    res.render(`./calendar/${filename}`, { req, ...other });
  };

  show = async (req, res) => {
    // Get all of the animals
    const animals = await Animal.find();

    // Concatenate all calendar items in a single array
    const calendarList = [];
    animals?.forEach((animal) => {
      const _calendarList = animal.calendarList;
      calendarList.push(..._calendarList);
    });

    // Sort the list by date
    calendarList.sort(({ date: a }, { date: b }) => a - b);

    this.render(req, res, "show", {
      calendarList,
    });
  };
}

module.exports = CalendarController;
