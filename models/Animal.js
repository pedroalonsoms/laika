const connect = require("../db/connect");
const { saveImages } = require("../lib/utils");

class Animal {
  types = ["Perro", "Gato", "Otro"];
  sexes = ["Macho", "Hembra"];
  statuses = ["Activo", "Adoptado", "Fallecido"];

  create = async (animal) => {
    const db = await connect();
    await db.query("INSERT INTO animals SET ?", animal);
    const [[{ id }]] = await db.query("SELECT LAST_INSERT_ID() AS id");
    return id;
  };

  addPhotos = async (id, files) => {
    const urls = await saveImages(files);

    const db = await connect();
    const values = urls.map((url) => [id, url]);
    if (values.length == 0) return;
    await db.query("INSERT INTO photos (animal_id, url) VALUES ?", [values]);
  };

  findById = async (id) => {
    const db = await connect();
    const [[animal]] = await db.query("SELECT * FROM animals WHERE id = ?", id);
    const [photos] = await db.query(
      "SELECT url FROM photos WHERE animal_id = ?",
      id
    );
    const urls = photos.map((photo) => `/uploads/${photo.url}`);

    return { ...animal, photos: urls };
  };

  findAll = async () => {
    const db = await connect();
    const [animals] = await db.query("SELECT * FROM animals");

    for (let i = 0; i < animals.length; i++) {
      const [photos] = await db.query(
        "SELECT * FROM photos WHERE animal_id = ? LIMIT 1",
        animals[i].id
      );

      if (photos.length == 0) {
        animals[i].photos = [`/images/default.webp`];
      } else {
        const urls = photos.map((photo) => `/uploads/${photo.url}`);
        animals[i].photos = urls;
      }
    }

    return animals;
  };

  deleteById = async (id) => {
    const db = await connect();
    await db.query("DELETE FROM animals WHERE id = ?", id);
  };

  updateById = async (id, animal) => {
    const db = await connect();
    await db.query("UPDATE animals SET ? WHERE id = ?", [animal, id]);
  };
}

module.exports = Animal;
