const hbs = require("hbs");
const { readConstant } = require("../lib/utils");

//Partials
hbs.registerPartials("./views/partials");

//Helpers
hbs.registerHelper("times", (n, block) => {
  var accum = "";
  for (var i = 0; i <= n; ++i) accum += block.fn(i);
  return accum;
});

hbs.registerHelper("dropdown", (title, includesAllField, options) => {
  const data = readConstant("dropdown_data")[title];

  return new hbs.handlebars.SafeString(`
    ${title}
    ${options.fn(this)}
    ${includesAllField && `<option value="">Todo</option>`}
    ${
      data &&
      data.map((element) => `<option value=${element}>${element}</option>`)
    }
    </select>
  `);
});
