const fs = require("fs");

module.exports.readConstant = (filename) => {
  return JSON.parse(fs.readFileSync(`./constants/${filename}.json`, "utf8"));
};
