const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    resizable: false,
    width: 1112,
    height: 834,
  })

  win.loadURL(`file://${__dirname}/dist/ethereum-explorer/index.html`);

  // uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

app.commandLine.appendSwitch('ignore-certificate-errors', true);

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})