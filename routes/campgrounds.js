var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/campgrounds",function(req, res){
  Campground.find({}, function(err, campgrounds){
    res.render("campgrounds/index",{data: campgrounds});
  })

});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, price:price, description:description, author:author}
    Campground.create(newCampground);
    res.redirect("/campgrounds");
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});


router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//     Campground.findById(req.params.id,function(err, foundCampground){

        res.render("campgrounds/show",{campground: foundCampground});
    });
});

//EDIT
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
      if(!err){
        res.render("campgrounds/edit",{campground: foundCampground});
      }
  })
});
//UPDATE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(!err){
          res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTORY
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
      res.redirect("/campgrounds");
    })
});

module.exports = router;
