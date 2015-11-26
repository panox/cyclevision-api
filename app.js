var express        = require('express');
var cors           = require('cors');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var secret = process.env.SECRET;

if(!secret) throw new Error('No secret in zshrc file');

// Database
var config = require('./config/config');
mongoose.connect(config.database);

// Require passport
require('./config/passport')(passport);

// Method Ovveride
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/signup', methods: ['POST'] }
    ]
  }));


// Routes
var routes = require('./config/routes');
app.use("/api", routes);

// Port
app.listen(process.env.PORT || 3000 );
console.log('listening to 3000')