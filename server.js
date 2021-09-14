/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const apiKey = process.env.UNSPLASH_APP_API_KEY;


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

//api "https://api.unsplash.com/photos/random?query=camera-&orientation=landscapre&content_safety=high&count=10&client_id=dnxslX9NqG7sdJIFpYSn_YeO8crKLlvk1r65XylTr1o"

/* Home Page */
app.get("/home", function (req, res){
  const context ={error:null}
  console.log(req.url)
  return res.render("home" ,context);
})

/* Routes */
app.use("/", controllers.auth);
app.use("/cameras", controllers.camera);
app.use("/profile", controllers.user);
app.use("/cameras", controllers.comment);



/* 404 Page */
app.get("/*", function (req, res){
  const context ={error: "Wrong Way bud."}
  res.render("404", context)
})

/* Port Binding */
app.listen(PORT, () =>{
  console.log(` FotoNegative is on port ${PORT}`);
})