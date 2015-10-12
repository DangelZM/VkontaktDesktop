(function(document) {
  "use strict";

  var ipc = window.require('ipc');
  window.$ = window.jQuery = window.require('./bower_components/jquery/dist/jquery.min.js');

  var app = document.querySelector('#app');
  console.log(document.querySelector('#long-poll'));
  app.longPoll = document.querySelector('#long-poll');
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

  app.longPoll.start();

})(document);
