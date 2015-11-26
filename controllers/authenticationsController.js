var passport = require("passport");
var User     = require('../models/user');
var jwt      = require('jsonwebtoken');
var secret   = process.env.SECRET;


function signup(req, res, next) {
  var localStrategy = passport.authenticate('local-signup', function(err, user, message) {
    if (err) return res.status(500).json({ message: err });
    if (!user) return res.status(401).json({ message: 'No user found' });

    console.log("HERE", secret);

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    console.log(token);

    return res.status(200).json({ 
      success: true,
      message: "Thank you for signing up",
      user: user,
      token: token
    });
  });

  return localStrategy(req, res, next);

};

function login(req, res, next) {
  User.findOne({
    "local.email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'Wrong Credentials' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Wrong Credentials' });

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token,
      user: user
    });
  });
};


module.exports = {
  signup: signup,
  login: login
}