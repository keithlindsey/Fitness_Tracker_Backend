function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }
  
  module.exports = {
    requireUser
  }


  //take a requrie params as an array, send a middleware function that isnt present.....whats the middle ware function supposed to do? takes in the request and the next function