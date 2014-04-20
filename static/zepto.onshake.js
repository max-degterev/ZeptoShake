;(function($) {
  var $window = $(window);

  if (typeof window.DeviceMotionEvent !== 'undefined') {
    $.onshake = function(callback, _sensitivity) {
      var sensitivity = Math.floor(100 / (_sensitivity || 3)),
          checkDelay = 100,
          callbackDelay = 2500; // protection from having multiple calls too often

      // Position variables
      var x1 = y1 = z1 = x2 = y2 = z2 = 0;

      var checkDeviceMotion = function() {
        var change = Math.abs((x1 - x2) + (y1 - y2) + (z1 - z2));

        // Update new position
        x2 = x1;
        y2 = y1;
        z2 = z1;

        if (change >= sensitivity) {
          callback.call(window);
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
