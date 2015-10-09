(function(document) {
  "use strict";

  var ipc = window.require('ipc');
  var app = document.querySelector('#app');
  app.player = document.querySelector('#app-player');
  app.token = localStorage.getItem('authToken');
  app.player.start();
  app.route = 'friends';
  app.notifier = window.require('node-notifier');

  app.onMenuSelect = function(){
    console.log('Select', app.route);
  };

  app.logout = function(){
    ipc.send('logout');
  };

  longPoll.start();

})(document);
