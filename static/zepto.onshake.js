;(function($) {
  var $window = $(window);

  if (typeof window.DeviceMotionEvent !== 'undefined') {
    $.onshake = function(callback, _sensitivity) {

      // Shake sensitivity (a lower number is more sensitive)
      var sensitivity = typeof _sensitivity === 'number' ? _sensitivity : 20,
        checkDelay = 100,
        callbackDelay = 2500; // protection from having 9999 calls at once

      // Position variables
      var x1 = 0,
          y1 = 0,
          z1 = 0,
          x2 = 0,
          y2 = 0,
          z2 = 0;

      var checkDeviceMotion = function() {
        var change = Math.abs((x1 - x2) + (y1 - y2) + (z1 - z2));

        // Update new position
        x2 = x1;
        y2 = y1;
        z2 = z1;

        if (change > sensitivity) {
          callback.call(window, change);
          $window.trigger('shake');
          setTimeout(checkDeviceMotion, callbackDelay);
        }
        else {
          setTimeout(checkDeviceMotion, checkDelay);
        }
      };

      var storeMotionData = function(e) {
        x1 = e.accelerationIncludingGravity.x;
        y1 = e.accelerationIncludingGravity.y;
        z1 = e.accelerationIncludingGravity.z;
      };

      // Listen to motion events and update the position
      $window.on('devicemotion', storeMotionData);

      // Periodically check the position and fire
      // if the change is greater than the sensitivity
      checkDeviceMotion();
    };
  }
  else {
    $.onshake = function() {};
  }
})(Zepto);
