(function (window) {
  "use strict";
  var ipc = require('ipc');
  var request = require('request');

  var longPoll = (function () {
    var lpServer;

    return {
      start: initLongPoll
    };

    function initLongPoll() {
      request("https://api.vk.com/method/messages.getLongPollServer?v=5.37&access_token=" + localStorage.getItem('authToken'), function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var json = JSON.parse(body);
          if(json.response){
            lpServer = json.response;
            getUpdate(lpServer.ts);
          }
        } else {
          console.log('Error: ', error);
        }
      });
    }

    function getUpdate(ts) {
      request("http://" + lpServer.server + "?act=a_check&key=" + lpServer.key + "&ts=" + ts + "&wait=2&mode=64" , function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var json = JSON.parse(body);
          if(json.ts){
            if(json.updates.length > 0){
              _.each(json.updates, function(update){
                console.log('Long Poll Updated:', update);
                processUpdate(update);

              });
            }
            getUpdate(json.ts);
          }
        } else {
          console.log('Long Poll Error:', error);
          console.log('Init new Long Poll:', error);
          initLongPoll();
        }
      });
    }

    function processUpdate(update) {
      if(update[0] === 4){
        console.log("Получено сообщение");
      }
    }

  })();

  window.longPoll = longPoll;

})(window);