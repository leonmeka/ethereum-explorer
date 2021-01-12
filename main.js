const { app, globalShortcut, BrowserWindow } = require('electron')
const Store = require('electron-store');
const { systemPreferences, session } = require('electron');
const store = new Store();
const electron = require('electron'),
  ipc = electron.ipcMain;

let win;

function createWindow() {
  // store.delete('eth-adresses');
  // Create the browser window.
  win = new BrowserWindow({
    resizable: false,
    width: 1112,
    height: 834,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
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
app.on('ready', () => {
  createWindow();
})

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


// Event Handling

// Click on external Link

ipc.on('externalLink', (event, args) => {
  const modal = new BrowserWindow({ parent: win, modal: true, show: false, resizable: false, frame: true })
  modal.loadURL(args)
  modal.once('ready-to-show', () => {
    modal.show()
  })

  modal.on('blur', function () {
    modal.hide()
  })
});

// Locally storing and saving data

ipc.on('load', (event, args) => {
  response = store.get(args);
  event.reply('asynchronous-reply', response)
});

ipc.on('save', (event, args) => {
  store.set('eth-adresses', args);
});