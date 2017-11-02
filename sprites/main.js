function init() {
	console.info("initialized sprites");
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext('2d');
	balls_image = document.getElementById("balls");
	var FRAMES_PER_SECOND /*FPS*/ = 24;

	var BALL_SPRITE = {
		x0: 0, y0: 50, // координаты на картинке картинке
		width: 50, height:50, // размеры кадра
		num: 10 // всего кадров
	};
	//время момента начала программы

	var program_start_time = new Date().getTime();
	requestAnimationFrame(draw_frame);

	function draw_frame() {
        requestAnimationFrame(draw_frame);

        //определим текущий кадр
		var current_time = new Date().getTime();
		var time_from_start = current_time - program_start_time;
		var frame = Math.round(time_from_start / 1000 * FRAMES_PER_SECOND);

		//рисуем один кадр, в нашем случае рисуем один кадр с мячиком.
		var sprite_x = BALL_SPRITE.x0 + BALL_SPRITE.width * (frame % BALL_SPRITE.num);

		ctx.drawImage(
			balls_image,
            sprite_x, BALL_SPRITE.y0, // координаты на картинке
			BALL_SPRITE.width, BALL_SPRITE.height, //размеры на картинке
			123, 123, //где рисовать на canvas
            BALL_SPRITE.width, BALL_SPRITE.height //размеры рисования
		)
    }
	//Заливка по шаблону
	var pattern = ctx.createPattern(
		document.getElementById("pattern"),
		"repeat" // repeat-x; repeat-y, no-repeat
	);

	ctx.fillStyle = pattern;
	//ctx.fillRect(0,0, canvas.width, canvas.height);

	// Заливка градиентом
	// google: MDN Canvas Gradient

	// Линейный градиент, еще бывает
	// createRadialGradient

	var gradient = ctx.createLinearGradient(
		0, 0, //начало градиента
		canvas.width, canvas.height // конец градиента
	);

	gradient.addColorStop(0, "red" );
	gradient.addColorStop(0.5, "#006688");
	gradient.addColorStop(1, 'blue');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}