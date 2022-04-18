const { app } = require('electron');

const { TrayController } = require('./app/controllers');
const { Notifications } = require('./app/workers');

const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';

if (isWin) {
  app.setAppUserModelId('HidratadO');
}

if (isMac) {
  app.dock.hide();
}

app.setLoginItemSettings({
  openAtLogin: true,
});

app.on('ready', () => {
  const notifications = new Notifications();
  const trayController = new TrayController();

  trayController.create();
  notifications.start();
});

app.on('window-all-closed', () => {
  app.quit();
});
