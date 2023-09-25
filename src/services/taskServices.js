const Task = require("../models/task");
const aqp = require("api-query-params"); //library ko có tham số page

const postTaskService = async (data) => {
  if (data.type === "EMPTY-TASK") {
    let result = await Task.create(data);
    return result;
  }
  return null;
};
const getTaskService = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;
  let offset = (page - 1) * limit;
  let result = await Task.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};
const updateTaskService = async (data) => {
  try {
    let task = await Task.updateOne({ _id: data.id }, { ...data });
    return task;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
const deleteTaskService = async (arrIds) => {
  try {
    let result = await Task.delete({ _id: { $in: arrIds } });
    return result;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
module.exports = {
  postTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
};
