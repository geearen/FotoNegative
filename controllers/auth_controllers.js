const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {User} = require("../models");

/* Register route  */
router.get("/register", function (req, res){
  const error = null;
  const context = {error}
  return res.render("auth/register", context);
});

/* Login route */
router.get("/login", function(req, res){
  return res.render("auth/login")
});

/* Register Post route */
router.post("/register", async (req, res) =>{
  try{
    const foundUser = await User.exists({$or:[{email: req.body.email}, {username: req.body.username}]})
    
    if(foundUser){
      const context = {error: "Username or Email Address already exist.",}
      return res.render("auth/register", context)
    };

    if(req.body.password !== req.body.password2) {
      const context = { error: "Password Does Not Match." };
      return res.render("auth/register", context);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash
    
    const newUser = await User.create(req.body);
    console.log(newUser);
    return res.redirect("/login");
  }catch(error){
    console.log(error);
    return res.send(error);
  }
})

/* Login Post Route */
router.post("/login", function(req, res){
  res.send("Account Login");
})

/* Log Out Route */
router.get("/logout", function (req,res){
  res.send("Logout");
})

module.exports = router;