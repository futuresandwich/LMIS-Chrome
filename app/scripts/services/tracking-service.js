'use strict';

angular.module('lmisChromeApp')
  .service('trackingService', function trackingService($window, $rootScope, config, utility, appConfigService) {
    var tracker = {
      sendAppView: function() {},
      sendException: function() {},
      sendEvent: function() {},
      set: function() {}
    };

    function setUUID(config) {
      // Workaround item:750
      if (utility.has(config, 'uuid')) {
        tracker.set('userId', config.uuid);
      }
    }

    function registerListeners() {
      $rootScope.$on('$stateChangeSuccess', function(event, state) {
        tracker.sendAppView(state.name);
      });
      $rootScope.$on('$stateNotFound', function(event, state) {
        tracker.sendException(state.to, false);
      });
    }

    if (utility.has($window, 'analytics')) {
      var service = $window.analytics.getService(config.analytics.service);
      tracker = service.getTracker(config.analytics.propertyID);
      registerListeners();
      appConfigService.getCurrentAppConfig()
        .then(setUUID);
    }

    this.tracker = tracker;
  });
