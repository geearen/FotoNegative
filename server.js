/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

/* Module Instance */
const app = express();

/* PORT */
const PORT = process.env.PORT || 7000

/* Internal Modules */
const controllers = require("./controllers");

/* App Config */
app.set("view engine", "ejs");

/* Session Controller */
app.use(
  session({
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge:1000*60*60*24*7*2,
    }
  })
);

/* Middleware */
app.use((req,res,next) =>{
  res.locals.user = req.session.currentUser;
  return next();
});

app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

/* Custom Middleware */
app.use(require("./utils/navlinks"));
app.use(require("./utils/logger"));

/* Routing to Home */
app.get("/", (req, res) => res.redirect("/home"));

/* Home Page */
app.get("/home", function(req, res){
  return res.render("home");
})

/* Routes */
app.use("/", controllers.auth);
app.use("/cameras", controllers.camera);
app.use("/profile", controllers.user);


/* 404 Page */
app.get("/*", function (req, res){
  res.send("ERROR")
})

/* Port Binding */
app.listen(PORT, () =>{
  console.log(` FotoNegative is on port ${PORT}`);
})