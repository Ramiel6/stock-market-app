var http = require('http');
var path = require('path');
// var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/routes.js');
var stock = require('./models/stockModel.js');




var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
// // app.use(cookieParser());
// app.use(cookieParser('HardSecret')); // cookie parser must use the same secret as express-session.
// const cookieExpirationDate = new Date();
// const cookieExpirationDays = 365;
// cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);


//  app.use(function(req, res, next) {  
//       res.header('Access-Control-Allow-Origin', req.headers.origin);
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
//  }); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// database
var url = 'mongodb://'+ process.env.IP +'/stockmarket';
mongoose.Promise = global.Promise;
mongoose.connect(url,{ useMongoClient: true });

//routes
app.use(express.static(path.resolve(__dirname, '../client')));
routes(app,stock);



io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('update-chart', function(){
    io.emit('update-chart', 'update');
  });
});
// const env = process.env.NODE_ENV || 'production';
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server is listening at", addr.address + ":" + addr.port);
});