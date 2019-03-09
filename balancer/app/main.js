const electron = require('electron');

const { app, BrowserWindow } = electron;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8',
    },
  });


  // Load the main page of app.
  win.loadFile('./app/resources/html/home.html');

  // Emitted when window is closed.
  win.on('closed', () => {
    // Dereference the window object.
    win = null;
  });
}

// Called when Electron has finished initialization
// and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Only quit if platform is not macOS.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // doc icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
