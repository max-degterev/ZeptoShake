/* Author:
    Max Degterev @suprMax
	
	$.onshake(callb, sens);
	
	based on  http://www.jeffreyharrell.com/blog/2010/11/creating-a-shake-event-in-mobile-safari/
*/

;(function($) {
	if (typeof window.DeviceMotionEvent !== 'undefined') {
		$.onshake = function(callb, sens) {
			// Shake sensitivity (a lower number is more sensitive)
			var sensitivity = sens || 20,
				checkDelay = 150,
				callbackDelay = 2500;

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
					callb.call(window);
					setTimeout(checkDeviceMotion, callbackDelay);
				}
				else {
					setTimeout(checkDeviceMotion, checkDelay);
				}	
			};

			// Listen to motion events and update the position
			window.addEventListener('devicemotion', function (e) {
				x1 = e.accelerationIncludingGravity.x;
				y1 = e.accelerationIncludingGravity.y;
				z1 = e.accelerationIncludingGravity.z;
			}, false);

			// Periodically check the position and fire
			// if the change is greater than the sensitivity
			checkDeviceMotion();
		};	
	}
	else {
		$.onshake = function() {};
	}
})(Zepto);
