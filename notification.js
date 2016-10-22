var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

(function($) {
  loadServiceWorker() {
    $.getScript( "https://github.com/jaga3421/helloruby/blob/master/sw.js" )
    .done(function( script, textStatus ) {
      console.log( textStatus );
      this.subscribe();
    })
    .fail(function( jqxhr, settings, exception ) {
        $( "div.log" ).text( "Triggered ajaxError handler." );
    });

  }
  subscribe() {
    if ('serviceWorker' in navigator) { 
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        console.log('Service Worker is ready)', reg);
        reg.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription) {
          var mergedEndpoint = this.endpointWorkaround(subscription);
          var deviceId = this.getDeviceId(mergedEndpoint);
          this.registerDevice(deviceId);
        });
      }).catch(function(err) {
        console.log('Service Worker error', error);
      });
    }
  }

  endpointWorkaround(pushSubscription) {
    if (pushSubscription.endpoint.indexOf(GCM_ENDPOINT) !== 0) {
      return pushSubscription.endpoint;
    }
    var mergedEndpoint = pushSubscription.endpoint;
    if  (this.isSubscriptionIdPresent()) {
      mergedEndpoint = [pushSubscription.endpoint, '/', pushSubscription.subscriptionId].join('');
    }
    return mergedEndpoint;
  }

  isSubscriptionIdPresent(pushSubscription) {
    return (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1);
  }

  getDeviceId(mergedEndpoint) {
    if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
      console.log('This browser isn\'t currently ' +
        'supported for this demo');
      return mergedEndpoint;
    }
    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];
  }

  registerDevice(deviceId) {
    var userEmail = domHelper.getAgentEmail();
    $.ajax({
      data: {email: userEmail, deviceId: deviceId},
      url: 'localhost:3000/device',
      method: 'POST',
      dataType: 'json',
      success: function(data){console.log('Registered Successfully!'); }
    });
  }
  loadServiceWorker();
}(jQuery));