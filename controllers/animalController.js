exports.animal_create_get = async (req, res) => {
  res.render("animal_form", {
    title: "Create Animal",
  });
};

exports.animal_create_post = async (req, res) => {
  console.log(req.body);
  res.send("success");
};
