'use strict';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('sw Installed');
});

self.addEventListener('activate', function(event) {
  console.log('sw Activated');
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);
  var msg = JSON.parse(event.data.text());
  console.log('Push message data', msg);
  var title = msg.title;
  var data = {'url': msg.url};
  
  event.waitUntil(

    self.registration.showNotification(title, {
      'body': msg.body,
      'icon': 'images/minions.png',
       'data': data
    }));
});

self.addEventListener('notificationclick', function(event) {
  this.data = event.notification.data;
  console.log('On notification click: data', data);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == self.data.url && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow("https://"+self.data.url);
  }));
});
