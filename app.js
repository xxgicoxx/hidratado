const { app } = require('electron');

const { TrayController } = require('./app/controllers');
const { Notifications } = require('./app/workers/cron-jobs/notifications');

const isMac = process.platform === 'darwin';

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
