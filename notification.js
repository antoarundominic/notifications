var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

window.Notification = function () {
};
Notification.prototype = {
  getDeviceId: function (mergedEndpoint) {
    console.log('This');
    if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
      console.log('This browser isn\'t currently ' +
        'supported for this demo');
      return mergedEndpoint;
    }
    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];
  },

  subscribe: function() {
    if ('serviceWorker' in navigator) { 
      navigator.serviceWorker.register('./assets/sw').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        console.log('Service Worker is ready)', reg);
        reg.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription) {
          var mergedEndpoint = endpointWorkaround(subscription);
          var deviceId = getDeviceId(mergedEndpoint);
          registerDevice(deviceId);
        });
      }).catch(function(err) {
        console.log('Service Worker error', err);
      });
    }
  },
  registerDevice: function(deviceId) {
    var userEmail = domHelper.getAgentEmail();
    $.ajax({
      data: {email: userEmail, deviceId: deviceId},
      url: 'localhost:3000/device',
      method: 'POST',
      dataType: 'json',
      success: function(data){console.log('Registered Successfully!'); }
    });
  },

  endpointWorkaround: function(pushSubscription) {
    if (pushSubscription.endpoint.indexOf(GCM_ENDPOINT) !== 0) {
      return pushSubscription.endpoint;
    }
    var mergedEndpoint = pushSubscription.endpoint;
    if  (isSubscriptionIdPresent()) {
      mergedEndpoint = [pushSubscription.endpoint, '/', pushSubscription.subscriptionId].join('');
    }
    return mergedEndpoint;
  },

  isSubscriptionIdPresent: function(pushSubscription) {
    return (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1);
  }
};
window.notification = new Notification();
console.log("window.notification", window.notification);