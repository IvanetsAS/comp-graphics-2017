function init() {
	console.info("initialized animation");
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext('2d'); 
	
	circleX = 100;
	circleY = 100;
	circleVX = 20;
	circleVY = 10;
	var k = 1;
	//setInterval(frame, 1000 / 60);
	requestAnimationFrame(frame);
	function currentTime(){
		return new Date().getTime();
	}
	var whenLastFrame = currentTime();
	function frame() {
		requestAnimationFrame(frame);
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		drawframe();
		
		//1) простая анимация, не зависит от времени
		// circleX += 1; изменение параметра
		var now = currentTime();
		var passed = now - whenLastFrame; // прошло между кадрами
		whenLastFrame = now;
		circleX = circleX + passed * circleVX / 1000; // за 1000 мс сдвиг 20
		circleY = circleY + passed * circleVY / 1000; // за 1000 мс сдвиг 20
		
		
	}
	function drawframe() {
		ctx.beginPath();
		ctx.arc(circleX, circleY, 10, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(0, 255, 120, 0.5)";
		ctx.fill();
		ctx.strokeStyle = "green";
		ctx.stroke();	

		if (circleX >= canvas.width) {
			k = - 1;
		}
		if (circleX <= 0) {
			k = 1;
		}
		//circleX += k;
	}
	
}