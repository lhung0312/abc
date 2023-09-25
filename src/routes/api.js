const express = require("express");
const routeAPI = express.Router();

const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultipleFilesAPI,
} = require("../controllers/apiController");
const {
  postCreateCustomer,
  postCreateArrayCustomer,
  getAllCustomers,
  putUpdateCustomer,
  deleteACustomer,
} = require("../controllers/customerController");

const {
  postCreateProjectAPI,
  getAllProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

const {
  postTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

routeAPI.get("/user", getUsersAPI);
routeAPI.post("/user", postCreateUserAPI);
routeAPI.put("/user", putUpdateUserAPI);
routeAPI.delete("/user", deleteUserAPI);

routeAPI.post("/file", postUploadSingleFileAPI);
routeAPI.post("/files", postUploadMultipleFilesAPI);

routeAPI.post("/customers", postCreateCustomer);
routeAPI.post("/customers-many", postCreateArrayCustomer);
routeAPI.get("/customers", getAllCustomers);
routeAPI.put("/customers", putUpdateCustomer);
routeAPI.delete("/customers-many", deleteACustomer);

routeAPI.post("/projects", postCreateProjectAPI);
routeAPI.get("/projects", getAllProject);
routeAPI.delete("/projects", deleteProject);
routeAPI.put("/projects", updateProject);

routeAPI.post("/tasks", postTask);
routeAPI.get("/tasks", getTask);
routeAPI.put("/tasks", updateTask);
routeAPI.delete("/tasks", deleteTask);

routeAPI.get("/info", (req, res) => {
  console.log(">>>>check query", req.query);

  return res.status(200).json({
    data: req.query,
  });
});
routeAPI.get("/info/:name/:address", (req, res) => {
  console.log(">>>>check params", req.params);

  return res.status(200).json({
    data: req.params,
  });
});

module.exports = routeAPI;
