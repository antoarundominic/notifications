<?php header('Access-Control-Allow-Origin: *'); ?>
<?php header("Access-Control-Allow-Headers: X-Requested-With"); ?>
<script   src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
<script   src="notification.js"></script>
<script   src="base64.js"></script>
<script   src="scripts/soundmanager2-jsmin.js"></script>

<link rel="manifest" href="manifest.json">
<link rel="stylesheet" type="text/css" href="styles.css">

<!-- Minion html start-->
<section class="content" id="target">
          <ul class="hair hair-left">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          </ul>
          <ul class="hair hair-right">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          </ul>
          <div class="body">
          <div class="glasses">
          <span class="band band-left"></span>
          <span class="band band-right"></span>
          <div class="glass">
           <div class="iris iris-left">
             <div class="shine"></div>
           </div>
          </div>
          <div class="glass">
           <div class="iris iris-right">
             <div class="shine"></div>
           </div>
          </div>
          </div>
          </div>
          <div class="mouth">
          <ul class="teeth">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          </ul>
          </div>
          <div class="pants">
          <div class="belt belt-left"></div>
          <div class="belt belt-right"></div>
          </div>
          <div class="super-pants">
          <div class="symbol">
          <div class="s-first-part"></div>
          <div class="s-second-part"></div>
          </div>
          </div>
          <div class="arm arm-left">
          <div class="hand">
          <ul class="fingers fingers-left">
           <li class="finger"></li>
           <li class="finger"></li>
           <li class="finger"></li>
          </ul>
          </div>
          </div>
          <div class="arm arm-right">
          <div class="hand">
          <ul class="fingers fingers-right">
           <li class="finger"></li>
           <li class="finger"></li>
          </ul>
          </div>
          </div>
          <div class="legs">
          <div class="leg"></div>
          <div class="leg"></div>
          </div>
          <div class="shoes shoes-left"></div>
          <div class="shoes shoes-right"></div>
          <div class="coat"></div>
     </section>
<!--  Minion html end-->



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
  // var soundManager = soundManager || {};
  // var mySoundObject = soundManager.createSound({
  //  id: 'mySound',
  //  url: '/sound/hello.mp3',
  //  autoPlay: true
  // });

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
           var authParams = JSON.parse(JSON.stringify(subscription)).keys;
          var params = {
            deviceId: deviceId,
            p256dh: authParams.p256dh,
            auth: authParams.auth
            // auth: encodeURIComponent(Base64.encode(authParams.auth))
          }
          notification.registerDevice(params);
        });
      }).catch(function(err) {
        console.log('Service Worker error', err);
      });
    }  
}, 2000);

</script>
<h3>Please allow us to send you Desktop Notifications</h3>
