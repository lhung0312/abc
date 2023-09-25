const express = require("express");
const route = express.Router();

const {
  getHomepage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
} = require("../controllers/homeController.js");

// route.Method('/route', handler)
route.get("/", getHomepage);
//render la link

route.get("/create", getCreatePage);

route.get("/update/:id", getUpdatePage);

route.post("/create-user", postCreateUser);

route.post("/update-user", postUpdateUser);

route.post("/delete-user/:id", postDeleteUser);

route.post("/delete-user", postHandleRemoveUser);

module.exports = route;
