var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");



var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index")

// seedDB();

// mongoose.connect("mongodb://localhost/yelp_camp_v5");
mongoose.connect("mongodb://zityuen:password@ds255347.mlab.com:55347/yelp_camp");


app.use(flash());
app.use(bodyParser.urlencoded({extende: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
  secret:"this is secret",
  resave: false,
  saveUnintialized:false
}))

app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.curUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);
//SCHEMA SETUP
// Campground.create({name:"beautiful camping", image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg", description:"This is a beautiful Camping really!!"});

app.get("/",function(req, res){
    res.render("landing");
});

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!!");
});
