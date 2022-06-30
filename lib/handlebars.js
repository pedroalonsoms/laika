const hbs = require("hbs");
const fs = require("fs");

//Future helpers
hbs.registerPartials("./views/partials");
hbs.registerHelper("times", (n, block) => {
  var accum = "";
  for (var i = 0; i <= n; ++i) accum += block.fn(i);
  return accum;
});

hbs.registerHelper("constant_array", (filename, block) => {
  const array = JSON.parse(fs.readFileSync(`./constants/${filename}`));
  var accum = "";
  for (element of array) accum += block.fn(element);
  return accum;
});
