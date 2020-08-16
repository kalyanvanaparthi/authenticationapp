var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var cors = require('cors');

const app = express();

PORT = process.env.PORT || 3000;

require('./api/config/passport');

mongoose.connect('mongodb://localhost:27017/meanapp2');

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully...");
})

mongoose.connection.on('error', (err) => {
    if(err) {
        console.log(err);
    }
    console.log("Database Connected Successfully...");
})

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));


app.use(passport.initialize());

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

app.use('/api', require('./api/routes/index'));

app.listen(PORT, () => {
    console.log("server started at port number : " + PORT);
});
