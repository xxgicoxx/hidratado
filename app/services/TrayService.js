const {
  app, Menu, Tray, shell,
} = require('electron');
const path = require('path');
const ElectronStore = require('electron-store');

const electronStore = new ElectronStore();

let tray = null;

class TrayService {
  create() {
    tray = new Tray(this.getIconPath());

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '10 Minutes',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 1),
        click() {
          electronStore.set('notification-time', 1);
        },
      },
      {
        label: '20 Minutes',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 2),
        click() {
          electronStore.set('notification-time', 2);
        },
      },
      {
        label: '30 Minutes',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 3),
        click() {
          electronStore.set('notification-time', 3);
        },
      },
      {
        label: '40 Minutes',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 4),
        click() {
          electronStore.set('notification-time', 4);
        },
      },
      {
        label: '50 Minutes',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 5),
        click() {
          electronStore.set('notification-time', 5);
        },
      },
      {
        label: '1 Hour',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 6),
        click() {
          electronStore.set('notification-time', 6);
        },
      },
      {
        label: '2 Hours',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 12),
        click() {
          electronStore.set('notification-time', 12);
        },
      },
      {
        label: '3 Hours',
        type: 'radio',
        checked: (electronStore.get('notification-time', 1) === 18),
        click() {
          electronStore.set('notification-time', 18);
        },
      },
      { type: 'separator' },
      {
        label: 'About',
        click() {
          shell.openExternal('https://github.com/xxgicoxx/hidratado');
        },
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click() {
          app.quit();
        },
      },
    ]);

    tray.setToolTip('Stay Hydrated');
    tray.setContextMenu(contextMenu);
  }

  getIconPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, 'static', 'img', 'trayTemplate.png');
    }

    return `${path.join(__dirname, '../static/img/trayTemplate.png')}`;
  }
}

module.exports = TrayService;
