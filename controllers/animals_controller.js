const { saveImages, removeEmpty } = require("../lib/utils");
const { Animal } = require("../models/animal");
const { Address } = require("../models/address");
const { Rescue } = require("../models/rescue");
const { Event } = require("../models/event");
const sharp = require("sharp");
const PDFDocument = require("pdfkit-table");
const fs = require("fs/promises");
const _fs = require("fs");
const path = require("path");

class AnimalsController {
  render = (req, res, filename, other) => {
    res.render(`./animals/${filename}`, { Animal, Address, req, ...other });
  };

  index = async (req, res) => {
    // Pagination logic
    const PER_PAGE = 20;
    const page = Math.max(
      1,
      Number(req.query.page) ? Number(req.query.page) : -Infinity
    );
    if ("page" in req.query) delete req.query["page"];

    // Query logic
    const query = removeEmpty(req.query);
    if ("name_or_alias" in query) {
      query.$or = [
        { name: { $regex: query["name_or_alias"], $options: "i" } },
        { alias: { $regex: query["name_or_alias"], $options: "i" } },
      ];
      delete query["name_or_alias"];
    }

    const total = await Animal.find(query).countDocuments();
    const animals = await Animal.find(query)
      .sort({ $natural: -1 })
      .limit(PER_PAGE)
      .skip(PER_PAGE * (page - 1));

    // Pagination info
    const from = (page - 1) * PER_PAGE + 1;
    const to = Math.min(page * PER_PAGE + 1, total);

    this.render(req, res, "index", { animals, page, from, to, total });
  };

  show = async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    this.render(req, res, "show", { animal });
  };

  new = async (req, res) => {
    const animal = new Animal();
    this.render(req, res, "new", { animal });
  };

  create = async (req, res) => {
    const urls = await saveImages(req.files);
    const animal = new Animal({ ...req.body, photos: urls });
    const { id } = await animal.save();
    res.redirect(`/animals/${id}`);
  };

  edit = async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    this.render(req, res, "edit", { animal });
  };

  update = async (req, res) => {
    const id = req.params.id;
    const urls = await saveImages(req.files);
    const animal = await Animal.findById(id);
    animal.set({ ...req.body, photos: [...animal?.photos, ...urls] });
    await animal.save();
    res.redirect(`/animals/${id}`);
  };

  delete = async (req, res) => {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    for (const path of animal.photos) {
      await fs.unlink(`./public${path}`);
    }
    res.redirect("/animals");
  };

  search = async (req, res) => {
    const animal = new Animal();
    const rescue = new Rescue();
    rescue.address = new Address();
    const event = new Event();
    this.render(req, res, "search", { animal, rescue, event });
  };

  print = async (req, res) => {
    const doc = new PDFDocument({ size: "letter" });

    const writeStream = _fs.createWriteStream("./tmp/output.pdf");
    doc.pipe(writeStream);
    doc.font("fonts/cartoon.ttf");

    const animal = await Animal.findById(req.params.id);

    const write = (model, pathName) => {
      doc.fontSize(20);
      doc.lineGap(5);

      const title = model.schema.path(pathName).options.title;
      doc.fillColor("#6ea6a5");
      doc.text(`${title}: `, { continued: true, baseline: "middle" });

      const value = model[pathName];
      let display;

      if (!value) {
        display = " ";
      } else if (value instanceof Date) {
        display = value.toText();
      } else {
        display = value;
      }

      doc.fillColor("black");
      doc.text(display, { baseline: "middle" });
    };

    const title = (text) => {
      doc.fontSize(40);
      doc.fillColor("#8a1b70");
      doc.text(text, { align: "center" });
    };

    const _table = async (_headers, _rows) => {
      doc.lineGap(5);

      const headers = _headers.map((header) => ({
        label: header,
        align: "center",
        headerColor: "#6ea6a5",
        headerOpacity: 1,
      }));

      await doc.table(
        { headers, rows: _rows, options: { padding: 5 } },
        {
          prepareHeader: () => {
            doc.fillColor("white");
            doc.fontSize(20);
          },
          prepareRow: () => {
            doc.fillColor("black");
            doc.fontSize(20);
          },
        }
      );
    };

    const footer = () => {
      doc.image("./public/images/logo.png", 220, 700, { width: 150 });
    };

    // Animal page
    title(animal.name);
    write(animal, "petco_id");
    write(animal, "name");
    write(animal, "alias");
    write(animal, "birth_date");
    write(animal, "species");
    write(animal, "color");
    write(animal, "sex");
    write(animal, "status");
    write(animal, "particular_signs");
    const DIMENSION = 150;
    const promises = animal.photos.map(async (photo, idx) => {
      const url = `./tmp/${idx}.jpeg`;
      await sharp("./public" + photo)
        .jpeg()
        .resize(DIMENSION * 3, DIMENSION * 3, {
          fit: "cover",
        })
        .toFile(url);
      return url;
    });
    const urls = await Promise.all(promises);

    const START_X = 70;
    const START_Y = 380;
    for (let i = 0; i < Math.min(urls.length, 6); i++) {
      doc.image(
        urls[i],
        START_X + DIMENSION * (i % 3),
        START_Y + DIMENSION * Math.floor(i / 3),
        { fit: [DIMENSION, DIMENSION] }
      );
    }
    footer();

    // Rescue page
    doc.addPage();
    title("Rescate");
    const { rescue } = animal;
    if (rescue) {
      write(rescue, "date");
      doc.fillColor("#6ea6a5");
      doc.text(`Edad de rescate: `, { continued: true, baseline: "middle" });
      doc.fillColor("black");
      doc.text(rescue.age, { baseline: "middle" });
      write(rescue, "rescuers");
      write(rescue, "organization");

      const { address } = rescue;
      write(address, "municipality");
      write(address, "zip_code");
      write(address, "neighborhood");
      write(address, "street");
      footer();
    }

    // Events page
    doc.addPage();
    title("Rehabilitación");
    const { events } = animal;
    let headers = ["Fecha", "Descripción", "Nota"];
    let rows = events.map(({ date, description, note }) => [
      date.toText(),
      description,
      note,
    ]);
    await _table(headers, rows);
    footer();

    // Homes page
    doc.addPage();
    title("Hogares");
    const { homes } = animal;
    headers = ["Fecha", "Inicio", "Regreso"];
    rows = homes.map((home) => {
      const { start_date, end_date } = home;
      return [
        home.type,
        start_date.toText(),
        end_date ? end_date.toText() : " ",
      ];
    });
    await _table(headers, rows);
    footer();
    doc.end();

    writeStream.on("finish", () => {
      res.download("./tmp/output.pdf", async (error) => {
        if (error) console.log(error);
        try {
          // Robado xd
          const directory = "tmp";
          const files = await fs.readdir(directory);
          for (const file of files) {
            if (file !== "_") {
              await fs.unlink(path.join(directory, file));
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
}

module.exports = AnimalsController;
