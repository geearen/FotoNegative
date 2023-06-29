const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");
const handleUploadProfile = require("../utils/handleUploadProfile");
const multer = require("multer");
const upload = multer({ dest: "/tmp/" });

router.use(upload.single("profileImage"));

/* Profile page */
router.get("/:username", async (req, res) => {
  try {
    const foundProfile = await User.findOne({ username: req.params.username });
    const allComments = await Comment.find({ user: foundProfile.id }).populate(
      "camera"
    );
    const context = {
      profile: foundProfile,
      comments: allComments,
      error: null,
    };

    if (!foundProfile) throw "Profile Does Not Exist.";

    return res.render("user/profile.ejs", context);
  } catch (error) {
    const context = { error };
    return res.render("404.ejs", context);
  }
});

/* Edit Profile */
router.get("/:username/edit", async (req, res) => {
  try {
    const editProfile = await User.findOne({ username: req.params.username });

    const context = {
      profile: editProfile,
      error: null,
    };

    if (!editProfile) throw "Unable to complete the request.";

    return res.render("user/edit.ejs", context);
  } catch (error) {
    const context = { error };
    console.log(error);
    return res.render("404.ejs", context);
  }
});

/* Update Profile */
router.put("/:username", handleUploadProfile, async (req, res, next) => {
  try {
    const updatedProfile = await User.findOneAndUpdate(
      req.body.username,
      { $set: req.body },
      { new: true }
    );

    if (req.body.user !== updatedProfile.id) {
      throw "Unable to comeplete the request";
    }
    return res.redirect(`/profile/${updatedProfile.username}/edit`);
  } catch (error) {
    console.log(error);
    const context = { error };
    return res.render("404.ejs", context);
  }
});

/* Delete Profile */
router.delete("/:username", async (req, res, next) => {
  try {
    const deletedProfile = await User.findOneAndDelete({
      username: req.params.username,
    });
    const deleteComments = await Comment.deleteMany({
      user: deletedProfile.id,
    });
    await req.session.destroy();
    if (req.body.user !== deletedProfile.id) {
      throw "Unable to comeplete the request";
    }
    if (!deletedProfile) throw "Unable to complete the request";

    return res.redirect("/home");
  } catch (error) {
    const context = { error };
    return res.render("404.ejs", context);
  }
});
module.exports = router;
