const express = require('express');
const router = express.Router();
const{Camera} = require("../models");

const apiKey = process.env.UNSPLASH_APP_API_KEY;

/* Index Route */
router.get("/", async(req, res, next) =>{
  try{
    const allCameras = await Camera.find({});
    const context = {
      cameras: allCameras,
    };
    return res.render("cameras/index", context);
  }catch(error){
    console.log(error);
    req.error = error;
    return next();
  }
});

/* New Route */
router.get("/new", function(req, res){
  const context = {};
  return res.render("cameras/new", context);
});

/* Create Route */
router.post("/", async (req, res) =>{
  try{
    const createdCamera = await Camera.create(req.body);
    return res.redirect('/cameras');
  }catch(error){
    const context = {error};
    console.log(error);
    return res.render("cameras/new")
  }
})

//api "https://api.unsplash.com/photos/random?query=film-&orientation=portrait&content_safety=high&client_id=dnxslX9NqG7sdJIFpYSn_YeO8crKLlvk1r65XylTr1o"

/* Show Page */
router.get("/:id", async (req, res, next) => {
  try{
    const foundCamera = await Camera.findById(req.params.id);

    const context ={
      camera: foundCamera,
    }
    return res.render("cameras/show", context);
  }catch(error){
    console.log(error);
    req.error = error;
    return next();
  }
});

/* Edit Page */
router.get("/:id/edit", async (req, res) =>{
  try{
    const foundCamera = await Camera.findById(req.params.id)
    const context = {
      camera: foundCamera
    }
    return res.render("cameras/edit", context);
  }catch(error){
    console.log(error);
    req.error = error;
    return next();
  }
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