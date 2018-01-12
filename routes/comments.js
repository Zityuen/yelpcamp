var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(!err){
      res.render("comments/new",{campground: campground});
    }
  })
})

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
      if(!err){
        Comment.create(req.body.comment, function(err, comment){
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment._id);
          campground.save();
          req.flash("success", "Successfully added comment!");
          res.redirect("/campgrounds/" + campground._id);
        })
      }
  })
});

//EDIT
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(!err){
      res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
    }
  })

});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(!err){
         res.redirect("/campgrounds/" + req.params.id);
       }
    })
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(!err){
        req.flash("success", "Comment deleted!");
        res.redirect("/campgrounds/" + req.params.id);
      }
    })
});

module.exports = router;
