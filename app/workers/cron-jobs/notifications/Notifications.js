const { Notification } = require('electron');
const ElectronStore = require('electron-store');

const electronStore = new ElectronStore();

const messages = require('../../../resources/json/messages');

class Notifications {
  start() {
    setInterval(() => {
      const notification = new Notification({
        title: 'Stay Hydrated',
        body: messages[Math.floor(Math.random() * 7)],
      });

      notification.show();
    }, (600000 * (electronStore.get('notification-time', 1))));
  }
}

module.exports = Notifications;
