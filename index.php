
<script   src="notification.js"></script>

<script type="text/javascript" defer>
setTimeout(function() {
  var notification = window.notification;
  console.log("window.notification", notification);
  // window.notification.getDeviceId('test');
  if ('serviceWorker' in navigator) { 
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        console.log('Service Worker is ready)', reg);
        reg.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription) {
          var mergedEndpoint = notification.endpointWorkaround(subscription);
          var deviceId = notification.getDeviceId(mergedEndpoint);
          notification.registerDevice(deviceId);
        });
      }).catch(function(err) {
        console.log('Service Worker error', err);
      });
    }  
}, 5000);

</script>


<h3>Hello</h3>
