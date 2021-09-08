const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

/* Register route  */
router.get("/register", function (req, res){
  res.send("Register Page");
})

/* Login route */
router.get("/login", function(req, res){
  res.send("Login Page");
})

/* Register Post route */
router.post("/register", function(req, res){
  res.send("Account Registered");
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