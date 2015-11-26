var mongoose = require("mongoose");
//require user model

var VideoSchema = new mongoose.Schema({
  video_title: String,
  video_url: String,
  video_location: String,
  user: //add user schema here
})

module.exports = mongoose.model("Video", VideoSchema);