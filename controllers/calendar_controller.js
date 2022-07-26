const e = require("express");
const { transformToUTCDate } = require("../lib/utils");
const { Animal } = require("../models/animal");

class CalendarController {
  render = (req, res, filename, other) => {
    res.render(`./calendar/${filename}`, { req, ...other });
  };

  show = async (req, res) => {
    // Get all of the animals
    const animals = await Animal.find();

    // We create an array of objects for the calendar
    const calendar = [];

    // We get the from and to date filter parameters
    let from = transformToUTCDate(new Date());
    if (req.query.date?.$gte) {
      from = transformToUTCDate(new Date(req.query.date.$gte));
    }

    let to = null;
    if (req.query.date?.$lte) {
      to = transformToUTCDate(new Date(req.query.date.$lte), "midnight");
    }

    const addItem = (item) => {
      const { date, description, animal } = item;

      // We don't want to add items that aren't inside our range
      if (!(date >= from)) return;
      if (to && !(date <= to)) return;

      // We find the index of the object that contains our dates. Ex: {date: "2022-07-07"}
      const dateKey = date.toText();
      const index = calendar.findIndex((item) => item.date === dateKey);

      if (index !== -1) {
        // If successfuly fonund, we append our item to that index in the array
        calendar[index].items.push({ description, animal });
      } else {
        // Else, we create a new element in our array
        calendar.push({ date: dateKey, items: [{ description, animal }] });
      }
    };

    for (const animal of animals) {
      for (const appointment of animal.appointments) {
        addItem({
          description: "Cita Médica",
          date: appointment.date,
          animal,
        });
      }
      for (const home of animal.homes) {
        const type = home.type.toLowerCase();

        addItem({
          description: `Inicia hogar ${type}`,
          date: home.start_date,
          animal,
        });

        addItem({
          description: `Termina hogar ${type}`,
          date: home.end_date,
          animal,
        });
      }
    }

    // We sort the calendar
    calendar.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));

    this.render(req, res, "show", { calendar, from, to });
  };
}

module.exports = CalendarController;
