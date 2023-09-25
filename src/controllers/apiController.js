const Customer = require("../models/customer");

const User = require("../models/user");
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/fileService");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};
const postCreateUserAPI = async (req, res) => {
  let email = req.body.herEmail;
  let Name = req.body.herName;
  let City = req.body.herCity;
  let user = await User.create({
    email,
    name: Name,
    city: City,
  }); //destructuring object
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};
const putUpdateUserAPI = async (req, res) => {
  let email = req.body.herEmail;
  let name = req.body.herName;
  let city = req.body.herCity;
  let userId = req.body.userId;
  let user = await User.updateOne(
    { _id: userId },
    { name: name, email: email, city: city }
  );
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};
const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;

  // await deleteUserById(id);
  let result = await User.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const postUploadSingleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  let result = await uploadSingleFile(req.files.img);
  console.log(">>> check result: ", result);

  return res.send("ok single");
};
const postUploadMultipleFilesAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  // upload single => file is an object
  // upload multiple => file is an array
  if (Array.isArray(req.files.img)) {
    let result = await uploadMultipleFiles(req.files.img);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    return await postUploadSingleFileAPI(req, res);
  }
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultipleFilesAPI,
};
