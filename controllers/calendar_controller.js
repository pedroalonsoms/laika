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

    const addItem = (item) => {
      const { date, description, animal } = item;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // We don't want to add past items
      if (date < today) return;

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
      for (const adoption of animal.adoptions) {
        const type = adoption.type.toLowerCase();

        addItem({
          description: `Inicia adopción ${type}`,
          date: adoption.start_date,
          animal,
        });

        addItem({
          description: `Termina adopción ${type}`,
          date: adoption.end_date,
          animal,
        });
      }
    }

    // We sort the calendar
    calendar.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));

    this.render(req, res, "show", { calendar });
  };
}

module.exports = CalendarController;
