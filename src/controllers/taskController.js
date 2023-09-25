const {
  postTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const postTask = async (req, res) => {
  let result = await postTaskService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const getTask = async (req, res) => {
  let result = await getTaskService(req.query);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const updateTask = async (req, res) => {
  let result = await updateTaskService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const deleteTask = async (req, res) => {
  let ids = req.body.id;
  let result = await deleteTaskService(ids);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
module.exports = { postTask, getTask, updateTask, deleteTask };
