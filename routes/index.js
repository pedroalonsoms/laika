const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("animal_list", { title: "Hello Laika!" });
});

module.exports = router;
