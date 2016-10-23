var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';
(function ($) {
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
          var mergedEndpoint = this.endpointWorkaround(subscription);
          var deviceId = this.getDeviceId(mergedEndpoint);
          this.registerDevice(deviceId);
        });
      }).catch(function(err) {
        console.log('Service Worker error', err);
      });
    }
  },
  registerDevice: function(deviceId) {
    var userEmail = this.getAgentEmail();
    if(userEmail === "") {
      return;
    }
    $.ajax({
      url: 'https://freshfone.ngrok.io/device?email='+userEmail+'&deviceId='+deviceId,
      dataType: 'jsonp',
      success: function(data){console.log('Registered Successfully!'); }
    });
  },

  endpointWorkaround: function(pushSubscription) {
    if (pushSubscription.endpoint.indexOf(GCM_ENDPOINT) !== 0) {
      return pushSubscription.endpoint;
    }
    var mergedEndpoint = pushSubscription.endpoint;
    if  (this.isSubscriptionIdPresent(pushSubscription)) {
      mergedEndpoint = [pushSubscription.endpoint, '/', pushSubscription.subscriptionId].join('');
    }
    return mergedEndpoint;
  },

  isSubscriptionIdPresent: function(pushSubscription) {
    return (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1);
  },
  getAgentEmail: function() {
    var url = window.location.href;
    var regex = new RegExp("[?&]email(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
};
window.notification = new Notification();
console.log("window.notification", window.notification);
}(jQuery));