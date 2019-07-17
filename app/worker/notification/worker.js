const {Notification} = require('electron');
const electronStore = require('electron-store');
const store = new electronStore();
const messages = require('../../resources/json/messages');

start = () => {
    setInterval(() => {
        let notification = new Notification({
            title: 'Stay Hydrated', 
            body: messages[Math.floor(Math.random() * 7)]
        });
    
        notification.show();
    }, (600000 * (store.get('notification-time', 1))));
}

module.exports = {
    start: start
}