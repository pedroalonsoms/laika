const { User } = require("../models/User");

exports.user_create_get = async (req, res) => {
  res.render("user_form", { title: "Create User" });
};

exports.user_create_post = async (req, res) => {
  const { fullname, phone, address, organization } = req.body;
  const user = new User({ fullname, phone, address, organization });
  await user.save();
  res.render("user_form", {
    title: "Create User",
    error: "User already exists",
  });
};

exports.user_list = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.render("user_list", {
    title: "User List",
    users,
  });
};
