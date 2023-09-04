const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDServices");
const connection = require("../config/database.js");
const { use } = require("../routes/web");

const getHomepage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers: results });
};

const getTrangchu = (req, res) => {
  // process data => models
  res.send("fdsfds");
};

const getTintuc = (req, res) => {
  res.send("fdsfds");
};

const postCreateUser = async (req, res) => {
  let email = req.body.herEmail;
  let Name = req.body.herName;
  let City = req.body.herCity;

  console.log(">>> email: ", email, "name: ", Name, "City: ", City);

  // connection.query(
  //     `INSERT INTO Users (email, name, city)
  //     VALUES (?, ?, ?);`,
  //     [email, Name, City],
  //     function(err, results) {
  //       console.log(results);
  //       res.send('create a new user succeed' )
  //     }
  //   );
  //     connection.query(
  //     'select * from Users',
  //     function(err, results, fields) {
  //         console.log(">>>> results = ",results);
  //     }
  //   );

  let [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city)
    VALUES (?, ?, ?);`,
    [email, Name, City]
  );

  // const [results, fields] = await connection.query('select * from Users')
  console.log(">>>results: ", results);
  res.send("Created user succeed");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userID = req.params.id;
  let user = await getUserById(userID);

  res.render("edit.ejs", { userEdit: user });
};

const postUpdateUser = async (req, res) => {
  let email = req.body.herEmail;
  let name = req.body.herName;
  let city = req.body.herCity;
  let userId = req.body.userId;

  await updateUserById(email, city, name, userId);

  // res.send("Updated user succeed");
  res.redirect("/");
};

const postDeleteUser = async (req,res) => {
  const userID = req.params.id;
  let user = await getUserById(userID);

  res.render('delete.ejs', {userEdit: user})
}

const postHandleRemoveUser = async (req,res) => {
  const id = req.body.userId

  await deleteUserById(id)
  
  res.redirect('/')
}

module.exports = {
  getHomepage,
  getTrangchu,
  getTintuc,
  postCreateUser,
  getCreatePage,
  getUpdatePage,postUpdateUser, 
  postDeleteUser, postHandleRemoveUser, 
};
