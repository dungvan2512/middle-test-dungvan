var express = require('express'),
    app = express();
var server = app.listen(8088);
var io = require('socket.io').listen(server);

var messages = [];

io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    var chekcMessage = msg.search("discussion");
    if(chekcMessage == -1){
      messages.push({from: from, msg: msg, color: "#009afd"});
    }
    io.emit('chatMessage', from, msg);
  });

  socket.on('joinChat', function(from, msg){
    socket.broadcast.emit('chatMessage', from, msg);
    io.to(socket.id).emit('oldMessage', messages);
  })


  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});

app.use(express.static(__dirname + ''));
