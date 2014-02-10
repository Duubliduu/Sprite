var Sprite = function ( settings ) {

	this.settings = {
		image: null,
		fps: 30,
		width: 512,
		height: 512,
		frames: [],
	};

	// Extend settings
	this.extend(this.settings, settings);

	// This variables are used to control framerate
	this.interval = 1000 / this.settings.fps;
	this.then = 0;

	// Canvas to draw in
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.settings.width;
	this.canvas.height = this.settings.height;
	this.context = this.canvas.getContext('2d');

	// Current frame
	this.current = 0;

	// Draw the first frame
	this.drawFrame();


};




/**
 * Extend object
 * Usage Sprite.extend({}, objA, objB);
 */
Sprite.prototype.extend = function(out) {
	out = out || {};
	for (var i = 1; i < arguments.length; i++) {
		if (!arguments[i]) {
			continue;
		}
		for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) {
				out[key] = arguments[i][key];
			}
		}
	}
	return out;
}




/**
 * Return the current frame
 */
Sprite.prototype.getFrame = function () {

	var now = Date.now(),
		delta = now - this.then;

	if (delta > this.interval) {
		this.then = now - (delta % this.interval);
		this.current = this.settings.frames[this.current + 1] ? this.current + 1 : 0;
		return this.drawFrame();
	} else {
		return this.canvas;
	}


}



/**
 * Draws the current frame
 */
Sprite.prototype.drawFrame = function () {

	var image = this.settings.image,
		frame = this.settings.frames[this.current],
		width = this.settings.width,
		height = this.settings.height,
		sx = frame.x,
		sy = frame.y;

	this.context.clearRect(0, 0, width, height);
	this.context.drawImage(image, sx, sy, width, height, 0, 0, width, height);

	return this.canvas;

}



/**
 * Shim layer with setTimeout fallback
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



// Our "game canvas"
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


// Preload the sprite image
var sprite_image = new Image();
sprite_image.onload = function() {


	// Create a new Sprite object
	var sprite = new Sprite({
		'image': this,
		'fps': 5,
		'width': 108,
		'height': 169,
		'frames': [

			// Hätäset freimit
			{ x: 0, y: 0 },
			{ x: 108, y: 0 },
			{ x: 216, y: 0 },
			{ x: 324, y: 0 },
			{ x: 432, y: 0 },
		]

	});

	// Animate
	(function animloop(){

	 	requestAnimFrame(animloop);
	 	ctx.clearRect(0, 0, 108, 169);
	 	ctx.drawImage(sprite.getFrame(), 0, 0);

	})();

};

sprite_image.src = 'mario.png';






