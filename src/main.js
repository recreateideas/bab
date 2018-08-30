// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, MenuItem, remote } = require('electron'),
  template = require('./electronUtils/contextMenu'),
  path = require('path'),
  { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

require('dotenv').config();
require('electron-reload')(__dirname);
require('electron-context-menu')({
  labels: {
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    copyImageAddress: 'Copy Image Address',
    inspect: 'Inspect Element'
  },
});

// Menu = require('electron').Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    // createContextMenu()
  }
})

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1311, height: 800, autoHideMenuBar: true,
    useContentSize: true,
    resizable: false,
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./public/index.html')
  mainWindow.webContents.session.clearCache(function() {
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  addReactReduxDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    hiddenWindow = null;
    app.quit()
  })

  // hiddenWindow = new BrowserWindow( {show: false})
  hiddenWindow = new BrowserWindow()
  hiddenWindow.webContents.openDevTools()
  hiddenWindow.loadURL(path.join('file://', __dirname, './server/electron_server.html'))


}

function addReactReduxDevTools() {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
