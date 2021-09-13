const express = require("express");
const router = express.Router();
const {User, Comment} = require("../models");

/* Profile page */
router.get('/:username', async(req, res) =>{
  try{
    const foundProfile = await User.findOne({username:req.params.username})
    const context = {
      profile: foundProfile,
      error:null,
    }

    if(!foundProfile) throw "Profile Does Not Exist."

    return res.render("user/profile", context);
  } catch(error){
    const context = {error};
    return res.render("404", context);
  }
})

/* Edit Profile */
router.get('/:username/edit', async (req, res) =>{
  try{
    const editProfile = await User.findOne({username:req.params.username});
    const context = {
      profile: editProfile,
      error:null,
    }

    if(!editProfile) throw "Unable to complete the request."

    return res.render("user/edit", context)
  }catch(error){
    const context = {error};
    console.log(error);
    return res.render("404", context);
  }
  
})

/* Update Profile */
router.put('/:username', async (req, res) =>{
  try{
    const updatedProfile = await User.findOneAndUpdate(
        req.body.username, 
        {$set:req.body}, 
        {new:true}
      );
    return res.redirect(`/profile/${updatedProfile.username}`)
  }catch(error){
    console.log(error);
    req.error = error;
    return next();
  }
})

/* Delete Profile */
router.delete('/:username', async (req, res, next)=>{
  try{
    const deleteProfile = await User.findOneAndDelete({username:req.params.username});
    await req.session.destroy();
    if(!deleteProfile) throw "Unable to complete the request";

    return res.redirect("/home");


  }catch(error){
    const context = {error};
    return res.render("404", context);
  }
})
module.exports = router;