const express = require("express");
const router = express.Router();
const { Comment } = require("../models");
const { authRequired } = require("../utils/auth");
const handleUploadFile = require("../utils/handleUploadFile");
const multer = require("multer");
const upload = multer({ dest: "/tmp/" });

router.use(upload.single("commentImages"));

/* Create Comment */
router.post(
  "/comment/:id",
  authRequired,
  handleUploadFile,
  async (req, res, next) => {
    try {
      const createComment = await Comment.create(req.body);
      if (!createComment) throw "Unable to create your comment";
      return res.redirect(`/cameras/${createComment.camera}`);
    } catch (error) {
      console.log(error);
      context = { error };
      return res.render("404.ejs", context);
    }
  }
);

/* Update Comment */
router.put(
  "/comment/:id/edit",
  authRequired,
  handleUploadFile,
  async (req, res, next) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedComment) throw "Unable to update your comment";

      return res.redirect(`/cameras/${updatedComment.camera}`);
    } catch (error) {
      console.log(error);
      context = { error };
      return res.render("404.ejs", context);
    }
  }
);

router.delete("/comment/:id", authRequired, async (req, res, next) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    return res.redirect(`/cameras/${deletedComment.camera}`);
  } catch (error) {
    console.log(error);
    const context = { error };
    return res.render("404.ejs", context);
  }
});
module.exports = router;
