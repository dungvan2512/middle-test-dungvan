app.controller('ChatController', function ($scope, $timeout) {
    var socket;
    var nameUser;
    init();

    function init() {
      initUserName();
      initChatEvent();
    }

    $scope.submitfunction = function() {
      var from = getElement('#user').val();
      var msg = getElement('#m').val();
      if(msg != '') {
        socket.emit('chatMessage', from, msg);
      }

      getElement('#m').val('');
    }

    $scope.notifyTyping = function() {
      var user = getElement('#user').val();
      socket.emit('notifyUser', user);
    }

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    function initUserName() {
      name = makeid();
      getElement('#user').val(name);
    }

    function initChatEvent() {
      socket = io.connect();

      socket.emit('joinChat', 'System', '<b>' + name + '</b> has joined the discussion');

      socket.on('chatMessage', function(from, msg){
        var me = getElement('#user').val();
        var color = (from == me) ? 'green' : '#009afd';
        var from = (from == me) ? 'Me' : from;
        var myMessage = getElement('#messages');
        myMessage.append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
      });

      socket.on('notifyUser', function(user){
        var me = angular.element(document.querySelector('#user')).val();
        if(user != me) {
          var myNotify = getElement('#notifyUser');
          myNotify.text(user + 'is typing.....');
        }
        $timeout(function (){ 
                getElement('#notifyUser').text('');
            }, 10000);
      });

      socket.on('oldMessage', function(messages){
        for (var i = 0; i < messages.length; i++) {
          var myMessage = getElement('#messages')
          ;
          myMessage.append('<li><b style="color:' + messages[i].color + '">' + messages[i].from + '</b>: ' + messages[i].msg + '</li>');
        } 
      });
    }

    function getElement(selector) {
      return angular.element(document.querySelector(selector));
    }
});