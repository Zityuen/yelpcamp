var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
          if(!err){
            if(foundComment.author.id.equals(req.user._id)){
              return next();
            } else {
              req.flash("error", "You don't have permission to do that!");
            }
          }
      })
    } else {
      req.flash("error", "You need to be logged in to do that!");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
          if(!err){
            if(foundCampground.author.id.equals(req.user._id)){
              return next();
            } else {
              req.flash("error", "You don't have permission to do that!");
            }
          }
      })
    } else {
      req.flash("error", "You need to be logged in to do that!");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
}



module.exports = middlewareObj;
