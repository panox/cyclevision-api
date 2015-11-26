var multer = require('multer');
var s3 = require('multer-s3');


var upload = multer({
  storage: s3({
    dirname: 'homes/photos',
    bucket: process.env.AWS_BUCKET_NAME,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'eu-west-1',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
});

module.exports = upload