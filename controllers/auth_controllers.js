const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {User} = require("../models");

/* Register route  */
router.get("/register", function (req, res){
  const context = {error: null}
  return res.render("auth/register", context);
});

/* Login route */
router.get("/login", function(req, res){
  // const error = null;
  const context = { error: null };
  return res.render("auth/login", context)
});

/* Register Post route */
router.post("/register", async (req, res) =>{
  try{
    const foundUser = await User.exists({$or:[{email: req.body.email}, {username: req.body.username}]})
    
    if(foundUser){
      // const context = {error: "Username or Email Address already exist.",}
      // return res.render("auth/register", context)
      throw "Username or Email Address already exist.";
    };

    if(req.body.password !== req.body.password2) {
      // const context = { error: "Password Does Not Match." };
      // return res.render("auth/register", context);
      throw "Password Does Not Match."
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash
    
    const newUser = await User.create(req.body);
    console.log(newUser);
    return res.redirect("/login");
  }catch(error){
    console.log(error);
    // return res.send(error);
    console.log(error);
    const context ={error}
    return res.render("auth/register", context)
  }
})

/* Login Post Route */
router.post("/login", async (req, res) =>{
  try {
    const foundUser = await User.findOne({username:req.body.username});

    /* Admin */
    if(req.body.username == "geearen"){
      const match = await bcrypt.compare(req.body.password, foundUser.password);
      if(!match) throw "Password Invalid"
    }
    
    if(req.body.username != "geearen"){
      const match = await bcrypt.compare(req.body.password, foundUser.password);
      if(!match) throw "Username and/or Password does not match";
    } 
    
    req.session.currentUser ={
      id:foundUser._id,
      username:foundUser.username,
    }
    return res.redirect("/home");

  } catch (error) {
    console.log(error);
    const context = {error}
    return res.render("auth/login", context)
  }
})

/* Log Out Route */
router.get("/logout", async (req,res) =>{
  try{
    await req.session.destroy();
    return res.redirect("/login");
  } catch(error){
    console.log(error);
    return res.send(error);
  }
})

module.exports = router;