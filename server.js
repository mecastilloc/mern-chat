var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const express = require("express");
const path = require("path");
const socket = require('socket.io');
var logger = require('morgan');
var http = require('http');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
var routes = require('./routes');

var httpServer = http.createServer(app);
httpServer.listen(5000, function(){
  console.log('server is running on port 5000')
});



io = socket(httpServer);

io.on('connection', (socket) => {
  console.log("scketID=" +socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern-chat", {useNewUrlParser: true});


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
