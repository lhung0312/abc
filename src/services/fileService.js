const path = require("path");

const uploadSingleFile = (fileObject) => {
  // đường dẫn đến nơi tệp sẽ được lưu trữ

  // var file_name = new Date(new Date().getTime()) + "_" + fileObject.name;
  let uploadPath = path.resolve(__dirname, "../public/img/uploads/");
  console.log(">>>__dirname: ", __dirname);
  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  let finalName = `${baseName}_${new Date()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;
  try {
    // for (var i = 0; i < fileObject.length; i++) {
    //   fileObject[i].mv(finalPath);
    // }
    fileObject.mv(finalPath);

    return {
      status: "succeed",
      path: finalName,
      err: null,
    };
  } catch (error) {
    console.log(">>>error: ", error);
    return {
      status: "failed",
      path: null,
      err: JSON.stringify(error),
    };
  }
};

const uploadMultipleFiles = (filesArr) => {
  console.log(">>>>filesArr: ", filesArr);
  try {
    let uploadPath = path.resolve(__dirname, "../public/img/uploads/");
    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < filesArr.length; i++) {
      let extName = path.extname(filesArr[i].name);
      let baseName = path.basename(filesArr[i].name, extName);
      let finalName = `${baseName}_${new Date()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;
      try {
        filesArr[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: filesArr[i].name,
          error: null,
        });
        countSuccess++;
      } catch (error) {
        resultArr.push({
          status: "failed",
          path: null,
          fileName: filesArr[i].name,
          error: JSON.stringify(err),
        });
      }
    }
    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
