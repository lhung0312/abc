const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDServices");
const connection = require("../config/database.js");
const { use } = require("../routes/web");
const User = require("../models/user");

const getHomepage = async (req, res) => {
  let results = await User.find({});
  return res.render("home.ejs", { listUsers: results });
};

const postCreateUser = async (req, res) => {
  let email = req.body.herEmail;
  let Name = req.body.herName;
  let City = req.body.herCity;

  console.log(">>> email: ", email, "name: ", Name, "City: ", City);

  // let [results, fields] = await connection.query(
  //   `INSERT INTO Users (email, name, city)
  //   VALUES (?, ?, ?);`,
  //   [email, Name, City]
  // );
  await User.create({
    email,
    name: Name,
    city: City,
  }); //destructuring object
  res.send("Created user succeed");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userID = req.params.id;
  // let user = await getUserById(userID);
  let user = await User.findById(userID).exec();

  res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let email = req.body.herEmail;
  let name = req.body.herName;
  let city = req.body.herCity;
  let userId = req.body.userId;

  // await updateUserById(email, city, name, userId);
  await User.updateOne(
    { _id: userId },
    { name: name, email: email, city: city }
  );

  // res.send("Updated user succeed");
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userID = req.params.id;
  let user = await User.findById(userID).exec();

  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;

  // await deleteUserById(id);
  await User.deleteOne({
    _id: id,
  });

  res.redirect("/");
};

module.exports = {
  getHomepage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
