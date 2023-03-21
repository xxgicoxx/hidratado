const {
  app, Menu, Tray, shell,
} = require('electron');
const path = require('path');
const ElectronStore = require('electron-store');

const { constants } = require('../utils');

const electronStore = new ElectronStore();

let tray = null;

class TrayService {
  create() {
    tray = new Tray(this.getIconPath());

    const contextMenu = Menu.buildFromTemplate(this.getOptions());

    tray.setToolTip(constants.APP_NAME);
    tray.setContextMenu(contextMenu);
  }

  getOptions() {
    const start = constants.TIME_START;
    const end = constants.TIME_END;
    const interval = constants.TIME_INTERVAL;
    const options = [];

    for (let time = start; time <= end; time += interval) {
      options.push({
        label: `${time} ${constants.MENU_MINUTES}`,
        type: constants.OPTION_TYPE_RADIO,
        checked: this.isTime(time),
        click: () => this.setTime(time),
      });
    }

    options.push(
      { type: constants.SEPARATOR },
      {
        label: constants.MENU_ABOUT,
        click: () => shell.openExternal(constants.MENU_ABOUT_LINK),
      },
      { type: constants.SEPARATOR },
      {
        label: constants.MENU_QUIT,
        click: () => app.quit(),
      },
    );

    return options;
  }

  setTime(time) {
    electronStore.set(constants.NOTIFICATION_TIME, time);
  }

  isTime(time) {
    return this.getTime() === time;
  }

  getTime() {
    return electronStore.get(constants.NOTIFICATION_TIME, constants.TIME_START);
  }

  getIconPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, ...constants.PATH_TRAY_TEMPLATE_PACKAGE);
    }

    return `${path.join(__dirname, constants.PATH_TRAY_TEMPLATE)}`;
  }
}

module.exports = TrayService;
