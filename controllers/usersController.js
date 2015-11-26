var User   = require('../models/user');

function usersIndex(req, res) {
  User.find().populate('images').exec(function(err, users){
    if (err) return res.status(404).json({message: 'No users found'});
    res.status(200).json({ users: users });
  });
}

function userShow(req, res){
  User.findById(req.params.id).populate('images').exec( function(err, user){
    if (err) return res.status(404).json({message: 'No user found'});
    res.status(200).json({ user: user });
  });
}

function userUpdate(req, res){
  User.findById(req.params.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.email) user.local.email = req.body.name;
    if (req.body.password) user.local.password = req.body.password;
    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.last_name) user.last_name = req.body.last_name;
    if (req.body.profile_pic) user.profile_pic = req.body.profile_pic;
    if (req.body.type_of_cyclist) user.type_of_cyclist = req.body.type_of_cyclist;
    if (req.body.about_me) user.about_me = req.body.about_me;
    if (req.body.city) user.city = req.body.city;

    user.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', user: user});
    });
  });
}

function userDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Could not delete user'});
   res.status(200).json({message: 'User has been successfully deleted'});
  });
}

module.exports = {
  usersIndex:  usersIndex,
  userShow: userShow,
  userUpdate: userUpdate,
  userDelete: userDelete
}
