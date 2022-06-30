var fs = require("fs");
var data = JSON.parse(fs.readFileSync("sinaloa.json", "utf8"));

const result = {};

for (dato of data) {
  const zip = dato.zipcode;
  if (!(zip in result)) {
    result[zip] = [];
  }
  result[zip].push(dato.colony);
}

console.log(result);

fs.writeFileSync("sinaloa2.json", JSON.stringify(result, null, 2));
