var Image = require('../models/image');
var User   = require('../models/user');

function imagesIndex(req, res) {
  Image.find().populate('user').exec(function(err, images){
    if (err) return res.status(404).json({ message: "no images found" });
    res.status(200).json({ images: images });
  });
}

function imageCreate(req, res){
  User.findById(req.body.user, function(err, user) {

    var image = new Image({
      title: req.body.title,
      location: req.body.location,
      image: req.file.key,
      user: req.body.user
    });

    image.save(function(err){
      if (err) return res.status(500).json({message: "problem saving image"})

      user.images.push(image);

      user.save(function(err){
        if (err) return res.status(500).json({message: "problem adding image to this user"})
        res.status(201).json({image: image});
      });
    
    });

  })
  
}

function imageShow(req, res) {
  var id = req.params.id;

  Image.findById({_id: id}).populate('user').exec(function(err, image){
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    if (!image) return res.status(404).json({message: "Sorry, we can't locate that image"});

    res.status(200).json({image: image});
    });
  }

function imageUpdate(req, res) {
  var id = req.params.id;

  Image.findById({_id: id}, function(err, image){
    if(err) return res.status(500).json({ message: "cannot update" });

    if (req.body.title) image.title = req.body.title;
    if (req.body.location) image.location = req.body.location;

  image.save(function(err) {
    if (err) return res.status(500).json({ message: "There is an error updating your image"})
    res.status(201).json({ message: "Image was successfully updated", image: image});
    })
  });
}

function imageDelete(req, res) {
  Image.findById(req.params.id, function(err, image) {
    if (err) return res.status(500).json({message: 'could not find the image'})

    User.update({_id: image.user}, {$pull : {images : image._id}}, function(err, user){
      if (err) return res.status(500).json({message: 'could not update user images collection'})
      image.remove(function(err) {
        if (err) return res.status(500).json({ message: "There is was an error deleting your image"})
      });
    });
    
    return res.status(200).json({ message: "Image was successfully removed"});
  });
}

module.exports = {
  imagesIndex: imagesIndex,
  imageCreate: imageCreate,
  imageShow  : imageShow,
  imageUpdate: imageUpdate,
  imageDelete: imageDelete
}