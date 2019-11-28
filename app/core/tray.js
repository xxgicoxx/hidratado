const {app, Menu, Tray, shell} = require('electron');
const path = require('path');
const electronStore = require('electron-store');
const store = new electronStore();

let tray = null;

create = () => {
    tray = new Tray(path.join(__dirname, '../resources/img/waterTemplate.png'));
    const contextMenu = Menu.buildFromTemplate([
      { label: '10 Minutes', type: 'radio', checked: (store.get('notification-time', 1) === 1),
        click () {
          store.set('notification-time', 1);
        }
      },
      { label: '20 Minutes', type: 'radio', checked: (store.get('notification-time', 1) === 2),
        click () {
          store.set('notification-time', 2);
        }
      },
      { label: '30 Minutes', type: 'radio', checked: (store.get('notification-time', 1) === 3),
        click () {
          store.set('notification-time', 3);
        }
      },
      { label: '40 Minutes', type: 'radio', checked: (store.get('notification-time', 1) === 4),
        click () {
          store.set('notification-time', 4);
        }
      },
      { label: '50 Minutes', type: 'radio', checked: (store.get('notification-time', 1) === 5),
        click () {
          store.set('notification-time', 5);
        }
      },
      { label: '1 Hour', type: 'radio', checked: (store.get('notification-time', 1) === 6),
        click () {
          store.set('notification-time', 6);
        }
      },
      { label: '2 Hours', type: 'radio', checked: (store.get('notification-time', 1) === 12),
        click () {
          store.set('notification-time', 12);
        }
      },
      { label: '3 Hours', type: 'radio', checked: (store.get('notification-time', 1) === 18),
        click () {
          store.set('notification-time', 18);
        }
      },
      { type: 'separator' },
      { label: 'About', 
        click () {
          shell.openExternal('https://github.com/xxgicoxx/hidratado')
        }
      },
      { type: 'separator' },
      { label: 'Quit', 
        click () {
          app.quit();
        }
      }
    ]);
  
    tray.setToolTip("Stay Hydrated");
    tray.setContextMenu(contextMenu);
}

module.exports = {
    create: create
}