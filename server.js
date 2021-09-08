/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

/* Moduel Instance */
const app = express();

/* PORT */
const PORT = process.env.PORT || 7000

/* Internal Modules */
const controllers = require("./controllers");

/* App Config */
app.set("view engine", "ejs");

/* Session Controller */

/* Middleware */
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

/* Custom Middleware */

/* Home Page */
app.get("/home", function(req, res){
  res.send("Home Page");
})

/* Routes */
app.use("/cameras", controllers.camera)

/* 404 Page */
app.get("/*", function (req, res){
  res.send("ERROR")
})

/* Port Binding */
app.listen(PORT, () =>{
  console.log(` FotoNegative is on port ${PORT}`);
})