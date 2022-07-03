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
  };

  findById = async (id) => {
    const db = await connect();
    const [[animal]] = await db.query("SELECT * FROM animals WHERE id = ?", id);
    return animal;
  };

  findAll = async () => {
    const db = await connect();
    const [animals] = await db.query("SELECT * FROM animals");
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
