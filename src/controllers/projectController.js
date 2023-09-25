const {
  createProject,
  getProjectService,
  deleteProjectService,
  updateProjectService,
} = require("../services/projectService");
const postCreateProjectAPI = async (req, res) => {
  let result = await createProject(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const getAllProject = async (req, res) => {
  let result = await getProjectService(req.query);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const deleteProject = async (req, res) => {
  let ids = req.body.id;
  let result = await deleteProjectService(ids);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const updateProject = async (req, res) => {
  let result = await updateProjectService(req.body);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
module.exports = {
  postCreateProjectAPI,
  getAllProject,
  deleteProject,
  updateProject,
};
