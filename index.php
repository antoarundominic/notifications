<?php header('Access-Control-Allow-Origin: *'); ?>
<?php header("Access-Control-Allow-Headers: X-Requested-With"); ?>
<script   src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
<script   src="notification.js"></script>
<link rel="manifest" href="manifest.json">


<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
  <script>
    var OneSignal = window.OneSignal || [];
    OneSignal.push(["init", {
      appId: "e3cfecf8-0f81-4391-8d57-967f9879c14e",
      autoRegister: false,
      notifyButton: {
        enable: true /* Set to false to hide */
      }
    }]);
  </script>

  
<script type="text/javascript" defer>
setTimeout(function() {
  var notification = window.notification;
  console.log("window.notification", notification);
  // window.notification.getDeviceId('test');
  // if ('serviceWorker' in navigator) { 
  //     navigator.serviceWorker.register('sw.js').then(function() {
  //       return navigator.serviceWorker.ready;
  //     }).then(function(reg) {
  //       console.log('Service Worker is ready)', reg);
  //       reg.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription) {
  //         var mergedEndpoint = notification.endpointWorkaround(subscription);
  //         var deviceId = notification.getDeviceId(mergedEndpoint);
  //         notification.registerDevice(deviceId);
  //       });
  //     }).catch(function(err) {
  //       console.log('Service Worker error', err);
  //     });
  //   }  
}, 5000);

</script>
<h3>Hello</h3>
