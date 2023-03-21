const { app, Notification } = require('electron');
const ElectronStore = require('electron-store');
const path = require('path');
const fs = require('fs');

const { constants } = require('../utils');

const electronStore = new ElectronStore();

class Notifications {
  start() {
    const rawText = fs.readFileSync(this.getDataPath());
    const messages = JSON.parse(rawText);

    setInterval(async () => {
      const notification = new Notification({
        title: constants.APP_NAME,
        body: messages[Math.floor(Math.random() * 7)],
      });

      notification.show();
    }, (60000 * (electronStore.get(constants.NOTIFICATION_TIME, constants.TIME_START))));
  }

  getDataPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, ...constants.PATH_MESSAGES_PACKAGE);
    }

    return `${path.join(__dirname, constants.PATH_MESSAGES)}`;
  }
}

module.exports = Notifications;
