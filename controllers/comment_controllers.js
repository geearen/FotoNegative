const express = require("express");
const router = express.Router();
const { authRequired } = require("../utils/auth");
const { Comment } = require("../models");



/* Create Comment */
router.post("/comment/:id", authRequired, async (req, res, next) => {
  try {
    const createComment = await Comment.create(req.body);
    if (!createComment) throw "Unable to create your comment";

    return res.redirect(`/cameras/${req.params.id}`);
  } catch (error) {
    console.log(error);
    context = { error };
    return res.render("404", context);
  }
});

/* Update Comment */
router.put("/comment/:id/edit", authRequired, async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (!updatedComment) throw "Unable to update your comment";

    return res.redirect(`/cameras/${updatedComment.camera}`);
  } catch (error) {
    console.log(error);
    context = { error };
    return res.render("404", context);
  }
});

router.delete("/comment/:id", authRequired, async (req,res,next) =>{
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id)
    
    return res.redirect(`/cameras/${deletedComment.camera}`)
  } catch (error) {
    console.log(error);
    const context = {error};
    return res.render("404", context);
  }
})
module.exports = router;