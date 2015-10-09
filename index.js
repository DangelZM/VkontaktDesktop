var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var mainWindow;

var appIcon = null;

app.on('ready', function(){
  appIcon = new Tray('./assets/images/trayIcon.png');
  var contextMenu = new Menu();
  contextMenu.append(new MenuItem({ label: 'Показать/Спрятать', click: function() { toggleAppVisible() } }));
  contextMenu.append(new MenuItem({ type: 'separator' }));
  contextMenu.append(new MenuItem({ label: 'Выход',  click: function() { app.quit(); } }));

  appIcon.setToolTip('VK Desktop');
  appIcon.setContextMenu(contextMenu);

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    "min-width"         : 800,
    "min-height"        : 600,
    show: false
  });
  mainWindow.loadUrl('file://' + __dirname + '/token.html');

  appIcon.on('clicked', function () {
    toggleAppVisible();
  });
});

ipc.on('startApp', function() {
  console.log('ipc:startApp!!!');
  mainWindow.loadUrl('file://' + __dirname + '/src/app.html');
  mainWindow.show();
});

ipc.on('logout', function() {
  console.log('ipc:logout!!!');
  mainWindow.webContents.session.clearStorageData({
    'storages': ['cookies', 'localstorage']
  }, function(){
    mainWindow.close();
  });
});

app.on('window-all-closed', function() {
  console.log('All windows closed: I\'m Quit!!!');
  app.quit();
});

function toggleAppVisible() {
  if(mainWindow.isVisible()){
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
  } else {
    mainWindow.show();
    mainWindow.setSkipTaskbar(false);
  }
}