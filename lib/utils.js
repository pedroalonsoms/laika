const fs = require("fs/promises");
const sharp = require("sharp");
const { randomUUID } = require("crypto");

module.exports.saveImages = async (files) => {
  // Create folder to store images
  const FOLDER = "./public/uploads/";
  try {
    await fs.access(FOLDER);
  } catch (e) {
    await fs.mkdir(FOLDER);
  }

  const urls = [];
  // Compress images
  for (const file of files) {
    const name = `${randomUUID()}.webp`;
    await sharp(file.buffer)
      .resize({ fit: sharp.fit.contain, width: 720 })
      .webp({ quality: 80 })
      .toFile(FOLDER + name);

    urls.push("/uploads/" + name);
  }

  return urls;
};

// Crazy stuff dont touch pls
const deleteUnusedKeys = (obj) => {
  for (key in obj) {
    if (typeof obj[key] === "object") {
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      } else {
        deleteUnusedKeys(obj[key]);
      }
    }
  }
  return obj;
};

// Crazy stuff dont touch pls
module.exports.removeEmpty = (obj) => {
  const _obj = Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v)
      .map(([k, v]) => [k, v === Object(v) ? this.removeEmpty(v) : v])
  );

  return deleteUnusedKeys(_obj);
};

const DAY_MILISECONDS = 1000 * 60 * 60 * 24;
const YEAR_MILISECONDS = DAY_MILISECONDS * 365;
const MONTH_MILISECONDS = DAY_MILISECONDS * 30;

module.exports.milisecondsToAge = (miliseconds) => {
  const years = parseInt(miliseconds / YEAR_MILISECONDS);
  miliseconds %= YEAR_MILISECONDS;
  const months = parseInt(miliseconds / MONTH_MILISECONDS);

  let str = "";
  if (years > 0) str += `${years} año(s) `;
  if (months > 0) str += `${months} mese(s)`;
  return str;
};

module.exports.transformToUTCDate = (date, type = "sunrise") => {
  const parts = date.toISOString().split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2].split("T")[0];

  let time;

  if (type === "sunrise") {
    time = "00:00:00.000";
  }

  if (type === "midnight") {
    time = "23:59:59.999";
  }

  return new Date(`${year}-${month}-${day}T${time}Z`);
};

// Explanation
// Mongoose by default stores dates with 0:0:0 hour, and thats ok

// To fill date inputs we need to have values without the hour, so we "trim them" here
Date.prototype.toDateInputValue = function () {
  return this.toISOString().slice(0, 10); // 2022-07-19
};

// To text is a function to render text, we currently dont have one, so we need to recycle it
Date.prototype.toText = function () {
  return this.toDateInputValue();
};
