const bucketS3 = require("../config/aws.connection");
const fs = require("fs");
const util = require("util");
const removeFile = util.promisify(fs.unlink);

const handleUploadProfile = async (req, res, next) => {
  try {
    const file = req.file;
    const validTypes = ["image/jpeg", "image/jpg"];

    if (validTypes.includes(file.mimetype)) {
      const result = await bucketS3.uploadFile(file);

      await removeFile(file.path);
      console.log(result.Location)
      req.body.profileImage = result.Location;
      next();
    } else {
      await removeFile(file.path);
      throw "Invalid File Type";
    }
  } catch (error) {
    const context = { error };
    return res.render("404", context);
  }
};

module.exports = handleUploadProfile;
