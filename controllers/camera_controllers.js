const express = require("express");
const router = express.Router();
const {authRequired} = require("../utils/auth");
const {adminRequired} = require("../utils/admin_auth")
const { Camera, Comment, Categories } = require("../models");
const axios = require('axios');

const adminID = process.env.adminID;

const apiKey = process.env.UNSPLASH_APP_API_KEY;

/* Index Route */
router.get("/", async (req, res, next) => {
  try {
    const allCameras = await Camera.find({}).sort("cameraName");
    const allCategory = await Categories.find({});

    if(req.session.currentUser && req.session.currentUser.id == adminID){
      const context = {
        categories:allCategory,
        cameras: allCameras,
        isAdmin: true,
        error:null
      }
      return res.render("cameras/index", context);
    }
    const context = {
      categories: allCategory,
      cameras: allCameras,
      isAdmin: false,
      error: null,
    };
    return res.render("cameras/index", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});
/* Filter Route */
router.get("/filter/:type", async (req, res, next) => {
  try {
    let type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1);
    const allCameras = await Camera.find({photographyType: type}).sort("cameraName");
    const allCategory = await Categories.find({});
    if (req.session.currentUser && req.session.currentUser.id == adminID) {
      const context = {
        categories: allCategory,
        cameras: allCameras,
        isAdmin: true,
        error: null,
      };
      return res.render("cameras/index", context);
    }
    const context = {
      categories: allCategory,
      cameras: allCameras,
      isAdmin: false,
      error: null,
    };
    return res.render("cameras/index", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

/* Filter Route for Categories */
router.get("/category/:id", async (req, res, next) => {
  try {
    const allCameras = await Camera.find({ category: req.params.id }).sort(
      "cameraName"
    );
    const allCategory = await Categories.find({});
    if (req.session.currentUser && req.session.currentUser.id == adminID) {
      const context = {
        categories: allCategory,
        cameras: allCameras,
        isAdmin: true,
        error: null,
      };
      return res.render("cameras/index", context);
    }
    const context = {
      categories: allCategory,
      cameras: allCameras,
      isAdmin: false,
      error: null,
    };
    return res.render("cameras/index", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

/* New Route */
router.get("/new", adminRequired, async (req, res) =>{
  try {
    const allCategories = await Categories.find({})
    const context ={
      categories:allCategories
    }
    return res.render("cameras/new", context);
    
  } catch (error) {
    const context = {error}
    return res.render("404", context)
  }
});

/* Create Route */
router.post("/", adminRequired, async (req, res) => {
  try {
    const createdCamera = await Camera.create(req.body);
    return res.redirect("/cameras");
  } catch (error) {
    const context = { error };
    console.log(error);
    return res.render("404", context);
  }
});


/* Show Page */
router.get("/:id", async (req, res, next) => {
  try {
    const foundCamera = await Camera.findById(req.params.id);
    const allComments = await Comment.find({ camera: req.params.id })
      .sort({ createdAt : -1})
      .populate("user");
    const foundCategory = await Categories.findOne({index: foundCamera.category});
    let unsplashData = []
    let apiRes = await axios.get(`https://api.unsplash.com/photos/random?count=5&query=${foundCamera.cameraName}&content_filter=high&client_id=${apiKey}`).then((response) => {unsplashData = response.data})
    if (req.session.currentUser && req.session.currentUser.id == adminID) {
      const context = {
        unsplashData,
        category:foundCategory,
        camera: foundCamera,
        comments: allComments,
        isAdmin: true,
        error:null,
      };
      return res.render("cameras/show", context);
    }

    const context = {
      unsplashData,
      category:foundCategory,
      camera: foundCamera,
      comments: allComments,
      isAdmin: false,
      error: null,
    };
    return res.render("cameras/show", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

/* Edit Page */
router.get("/:id/edit", adminRequired, async (req, res, next) => {
  try {
    const foundCamera = await Camera.findById(req.params.id);
    const allCategories = await Categories.find({});
    const context = {
      categories:allCategories,
      camera: foundCamera,
      error:null,
    };
    return res.render("cameras/edit", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

/* Update Page */
router.put("/:id", adminRequired, async (req, res, next) => {
  try {
    const updatedCamera = await Camera.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
      );
    return res.redirect(`/cameras/${updatedCamera.id}`)
  } catch(error){
    console.log(error);
    req.error = error;
    return next();
  }
});

/* Delete Page */
router.delete("/:id", adminRequired, async (req, res, next) => {
  try{
    await Camera.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({camera:req.params.id})
    return res.redirect("/cameras")
  }catch(error){
    console.log(error);
    const context = {error};
    return res.render("404", context);
  }
});


module.exports = router;
