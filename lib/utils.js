const _fs = require("fs");
const fs = require("fs/promises");
const sharp = require("sharp");
const { randomUUID } = require("crypto");

module.exports.readConstant = (filename) => {
  return JSON.parse(_fs.readFileSync(`./constants/${filename}.json`, "utf8"));
};

module.exports.saveImages = async (files) => {
  // Create folder to store images
  const FOLDER = "./public/uploads";
  try {
    await fs.access(FOLDER);
  } catch (e) {
    await fs.mkdir(FOLDER);
  }

  const urls = [];
  // Compress images
  for (file of files) {
    const name = `/${randomUUID()}.webp`;
    await sharp(file.buffer)
      .webp({ quality: 30 })
      .toFile(FOLDER + name);

    urls.push("/uploads" + name);
  }

  return urls;
};
