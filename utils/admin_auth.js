module.exports = {
  adminRequired: (request, response, next) => {
    if(request.session.currentUser){
      if (request.session.currentUser.id == "613bcb0fab528f7ec08a63b1") {
        console.log("=== Admin Login ===");
        return next();
      } 
    }else {
        const context = { error: "You dont have the Admin's permission" };
        return response.render("auth/login", context);
    }
  }
};
