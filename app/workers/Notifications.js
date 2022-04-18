const { app, Notification } = require('electron');
const ElectronStore = require('electron-store');
const path = require('path');
const fs = require('fs');

const electronStore = new ElectronStore();

class Notifications {
  start() {
    const rawText = fs.readFileSync(this.getDataPath());
    const messages = JSON.parse(rawText);

    setInterval(async () => {
      const notification = new Notification({
        title: 'Stay Hydrated',
        body: messages[Math.floor(Math.random() * 7)],
      });

      notification.show();
    }, (600000 * (electronStore.get('notification-time', 1))));
  }

  getDataPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, 'static', 'data', 'messages.json');
    }

    return `${path.join(__dirname, '../static/data/messages.json')}`;
  }
}

module.exports = Notifications;
