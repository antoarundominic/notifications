'use strict';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('sw Installed');
});

self.addEventListener('activate', function(event) {
  console.log('sw Activated');
});

self.addEventListener('push', function(event, payload) {
  console.log('Push message', event);
  var title = 'Push message';
  event.waitUntil(

    self.registration.showNotification(title, {
      'body': 'The Message',
      'icon': 'images/icon.png'
    }));
});
