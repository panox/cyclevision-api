var express  = require('express');
var router   = express.Router();
var passport = require("passport");



var usersController = require('../controllers/usersController');
var imagesController = require('../controllers/imagesController');
var authenticationsController = require('../controllers/authenticationsController');

var upload = require(__dirname +"/upload.js")


router.post('/signup', authenticationsController.signup);
router.post('/login', authenticationsController.login);

router.route('/users')
  .get(usersController.usersIndex);


router.route('/users/:id')
  .get(usersController.userShow)
  .put(usersController.userUpdate)
  .delete(usersController.userDelete);

router.route('/images')
  .get(imagesController.imagesIndex)
  .post(upload.single("image"), imagesController.imageCreate);


router.route('/images/:id')
  .get(imagesController.imageShow)
  .put(upload.single("image"), imagesController.imageUpdate)
  .delete(imagesController.imageDelete);

module.exports = router