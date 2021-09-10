const express = require("express");
const router = express.Router();
const {User, Comment} = require("../models");

/* Profile page */
router.get('/:username', async(req, res) =>{
  try{
    const foundProfile = await User.findOne({username:req.params.username})
    const context = {
      profile: foundProfile,
    }
    return res.render("user/profile", context);
  } catch(error){
    req.error = error;
    return res.render("404");
  }
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