const { saveImages, removeEmpty } = require("../lib/utils");
const { Animal } = require("../models/animal");
const { Address } = require("../models/address");
const { Rescue } = require("../models/rescue");
const { Event } = require("../models/event");
const fs = require("fs/promises");

class AnimalsController {
  render = (req, res, filename, other) => {
    res.render(`./animals/${filename}`, { Animal, Address, req, ...other });
  };

  index = async (req, res) => {
    // Pagination logic
    const PER_PAGE = 10;
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

  print = async(req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Obtain URL origin
    const referrer = req.get('referrer');
    const link = new URL(referrer);
    const origin = link.origin;

    await page.goto(`${origin}/login`, {
    waitUntil: 'networkidle2',
  });
    await page.focus('#passphrase');
    await page.keyboard.type(process.env.ADMIN);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({waitUntil: 'networkidle2'})
    const url = `${origin}/animals/${req.params.id}`;
    const array = ["/","/rescue", "/appointments","/events","/homes"];

    const merger = new PDFMerger();
    for (let i = 0; i < array.length; i++) {
      await page.goto(url + array[i], {
        waitUntil: 'networkidle2',
      });
      await page.pdf({path: `tmp/${i}.pdf`, format: 'letter'});
      merger.add(`tmp/${i}.pdf`);
    }
    await merger.save('tmp/merged.pdf');
    
    res.download('tmp/merged.pdf', "Información.pdf");

    // Código robado
    const directory = 'tmp';

    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });

    await page.goto(`${origin}/logout`, {
      waitUntil: 'networkidle2',
    });

    

    await browser.close();

    console.log("Impreso exitosamente");
  }
}

module.exports = AnimalsController;
