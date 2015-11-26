module.exports = {
  'database': process.env.MONGOLAB_URI || 'mongodb://localhost/cyclevision',
  'bucket': 'https://s3-eu-west-1.amazonaws.com/cyclevision/'
};