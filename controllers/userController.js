const { User } = require("../models/User");

exports.user_create_get = async (req, res) => {
  res.render("user_form", { title: "Create User" });
};

exports.user_create_post = async (req, res) => {
  const { fullname, phone, address, organization } = req.body;
  const user = new User({ fullname, phone, address, organization });

  let error = null;
  try {
    await user.save();
    res.redirect("/users");
  } catch (e) {
    error = "Unknown error";
    if (e.message.includes("duplicate key")) error = "User already exists!";
    res.render("error", { title: "Error", error });
  }
};

exports.user_list = async (req, res) => {
  try {
    const users = await User.find();
    res.render("user_list", { title: "User List", users });
  } catch (e) {
    res.render("error", { title: "Error", error: "Unknown error" });
  }
};

exports.user_delete = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.redirect("back");
  } catch (e) {
    error = "Unknown error";
    if (e.message.includes("Cast to ObjectId failed")) error = "Id not found!";
    res.render("error", { title: "Error", error });
  }
};
