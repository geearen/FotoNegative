module.exports = {
  authRequired:  (request, response, next) =>{
    if (!request.session.currentUser) {
      return response.redirect("/login");
    } else {
      request.body.user = request.session.currentUser.id;
      console.log(request.body.user)
      return next();
    }
  },
};
