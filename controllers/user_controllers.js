const express = require("express");
const router = express.Router();
const {User, Comment} = require("../models");

/* Profile page */
router.get('/:username', function(req, res){
  return res.send("Profile page");
})

/* Edit Profile */
router.get('/:username/edit', function(req, res){
  return res.send("Edit Profile");
})

/* Update Profile */
router.put('/:username', function (req, res){
  return res.send("Update Profile")
})

router.delete('/:username', function(req, res){
  return res.send("Delete Profile")
})
module.exports = router;