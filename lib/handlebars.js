const hbs = require("hbs");

//Future helpers
hbs.registerPartials("./views/partials");
hbs.registerHelper("times", function (n, block) {
  var accum = "";
  for (var i = 0; i <= n; ++i) accum += block.fn(i);
  return accum;
});
