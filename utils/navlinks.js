const routes = [
  {href: "/logout", title:"Logout"},
]

const authRoutes =[
  {href: "#modal-login", title: "Login" , class: "uk-toggle"},
  {href: "/register", title: "Register" , class: ""},
]

module.exports = function navLinks(req, res, next){
  if(req.session.currentUser){
    res.locals.routes = routes;
  } else {
    res.locals.routes = authRoutes;
  }
  next();
}