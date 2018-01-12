var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name:"beautiful camping",
    image:"https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg",
    description:"blah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blah"
  },
  {
    name:"night camping",
    image:"http://www.readersdigest.ca/wp-content/uploads/2016/05/7-reasons-why-you-should-go-camping-this-summer.jpg",
    description:"blah blah blah blah blah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blah"
  },
  {
    name:"mountain camping",
    image:"https://timedotcom.files.wordpress.com/2017/03/time-health-stock-sleep-camping.jpg?quality=85",
    description:"blah blah blah blah blah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blah"
  }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(!err){
          data.forEach(function(seed){
              Campground.create(seed, function(err, campground){
                if(!err){
                  Comment.create(
                  {
                      text:"This place is great, but I wish there was internet",
                      author:"Homer"
                  }, function(err, comment){
                      if(!err){
                        console.log(comment);
                          campground.comments.push(comment._id);
                          campground.save();
                        console.log("add comment");
                      }
                  });
                }
              });
          });
        }
    });
}

module.exports = seedDB;
