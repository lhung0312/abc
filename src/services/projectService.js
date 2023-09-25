const Project = require("../models/project");
const aqp = require("api-query-params"); //library ko có tham số page

const createProject = async (data) => {
  console.log("myProject", data);

  if (data.type === "EMPTY-PROJECT") {
    let result = await Project.create(data);
    return result;
  }
  if (data.type === "ADD-USER") {
    let myProject = await Project.findById(data.projectId).exec();
    console.log(myProject);
    for (let i = 0; i < data.usersArr.length; i++) {
      myProject.usersInfor.push(data.usersArr[i]);
    }
    let newResult = await myProject.save();
    console.log(newResult);
    return newResult;
  }
  if (data.type === "ADD-TASKS") {
    let myProject = await Project.findById(data.projectId).exec();
    for (let i = 0; i < data.taskArr.length; i++) {
      myProject.tasks.push(data.taskArr[i]);
    }
    let newResult = await myProject.save();
    return newResult;
  }
  if (data.type === "REMOVE-USERS") {
    let myProject = await Project.findById(data.projectId).exec();

    for (let i = 0; i < data.usersArr.length; i++) {
      myProject.usersInfor.pull(data.usersArr[i]);
    }
    let newResult = await myProject.save();
    return newResult;
  }
  return null;
};
const getProjectService = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;
  let offset = (page - 1) * limit;
  result = await Project.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();

  return result;
};
const deleteProjectService = async (arrIds) => {
  try {
    let result = await Project.delete({ _id: { $in: arrIds } });
    return result;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
const updateProjectService = async (data) => {
  try {
    let project = await Project.updateOne({ _id: data.id }, { ...data });
    return project;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
module.exports = {
  createProject,
  getProjectService,
  deleteProjectService,
  updateProjectService,
};
