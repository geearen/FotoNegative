const bucketS3 = require("../config/aws.connection");
const fs = require('fs');
const util = require('util');
const removeFile = util.promisify(fs.unlink)

const handleUploadFile = async (req, res, next) =>{
  try{
    const file = req.file;
    const validTypes = ['image/jpeg', 'image/jpg',]
    console.log({file})

    if(validTypes.includes(file.mimetype)){
      const result = await bucketS3.uploadFile(file)
      console.log(result)

      await removeFile(file.path);
      req.body.commentImages = result.Location;
      next();
    }else{
      await removeFile(file.path);
      throw "Invalid File Type"
    }

  }catch(error){
    const context = {error}
    return res.render("404", context);
  }

}

module.exports = handleUploadFile;