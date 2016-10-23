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
  event.waitUntil(

    self.registration.showNotification(title, {
      'body': msg.body,
      'icon': 'images/icon.png'
    }));
});
