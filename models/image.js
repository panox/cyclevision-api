var mongoose = require("mongoose");
//require user and routes schema

var ImageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
  title: String,
  location: String,
  created_at: Date,
  updated_at: Date
})

ImageSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model("Image", ImageSchema);