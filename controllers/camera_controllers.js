const express = require('express');
const router = express.Router();
const{Camera} = require("../models");


/* Index Route */
router.get("/", async(req, res, next) =>{
  try{
    const allCameras = await Camera.find({});
    const context = {
      cameras: allCameras,
    };
    return res.render("camera/index", context);
  }catch(error){
    console.log(error);
    req.error = error;
    return next();
  }
});

/* New Route */
router.get("/new", function(req, res){
  const context = {};
  return res.render("camera/new", context);
});

/* Create Route */
router.post("/", function(req, res){
  res.send("Create Page");
})

/* Show Page */
router.get("/:id", function(req, res){
  res.send("Show Page");
});

/* Edit Page */
router.get("/:id/edit", function(req, res){
  res.send("Edit Camera page");
})

/* Update Page */
router.put("/:id", function(req, res){
  res.send("Updated Camera")
})

/* Delete Page */
router.delete("/:id", function(req, res){
  res.send("Deleted Camera");
});

module.exports = router;