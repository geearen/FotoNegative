const express = require("express");
const router = express.Router();
const {authRequired} = require("../utils/auth");
const {adminRequired} = require("../utils/admin_auth")
const { Camera, Comment } = require("../models");

const adminID = process.env.adminID;

const apiKey = process.env.UNSPLASH_APP_API_KEY;

/* Index Route */
router.get("/", async (req, res, next) => {
  try {
    const allCameras = await Camera.find({});
    if(req.session.currentUser && req.session.currentUser.id == adminID){
      const context = {
        cameras: allCameras,
        isAdmin: true
      }
      return res.render("cameras/index", context);
    }
    const context = {
      cameras: allCameras,
      isAdmin:false,
    };
    return res.render("cameras/index", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

/* New Route */
router.get("/new", adminRequired, function (req, res) {
  const context = {};
  return res.render("cameras/new", context);
});

/* Create Route */
router.post("/", adminRequired, async (req, res) => {
  try {
    const createdCamera = await Camera.create(req.body);
    return res.redirect("/cameras");
  } catch (error) {
    const context = { error };
    console.log(error);
    return res.render("cameras/new", context);
  }
});

//api "https://api.unsplash.com/photos/random?query=film-&orientation=portrait&content_safety=high&client_id=dnxslX9NqG7sdJIFpYSn_YeO8crKLlvk1r65XylTr1o"

/* Show Page */
router.get("/:id", async (req, res, next) => {
  try {
    const foundCamera = await Camera.findById(req.params.id);
    const allComments = await Comment.find({camera: req.params.id}).populate('user');

    if (req.session.currentUser && req.session.currentUser.id == adminID) {
      const context = {
        camera: foundCamera,
        comments: allComments,
        isAdmin: true,
      };
      return res.render("cameras/show", context);
    }

    const context = {
      camera: foundCamera,
      comments: allComments,
      isAdmin: false,
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
    const context = {
      camera: foundCamera,
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
