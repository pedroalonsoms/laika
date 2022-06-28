const express = require("express");
const app = express();
const PORT = process.env.PORT | 3000;

// Handlebars
require("./lib/handlebars");
app.set("view engine", "hbs");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// Routers
const router = require("./routes/index");
app.use("/", router);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}`));
