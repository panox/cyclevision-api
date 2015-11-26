var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  first_name: String,
  last_name: String,
  profile_pic: String,
  type_of_cyclist: String,
  about_me: String,
  city: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

UserSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);