function init() {
	console.info("initialized animation");
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext('2d'); 
	
	var circleX = canvas.width / 2;
    var circleY = canvas.height / 2;
	var circleVX = 90;
	var circleVY = 100;
	var rectWidth = 300;
	var rectHeight = 100;
	var x1 = circleX - rectWidth / 2;
	var y1 = circleY - rectHeight / 2;
    var i;
    var balls = [{circleX:circleX, circleY:circleY, circleVX: circleVX, circleVY: circleVY, radius:10, color:"rgba(255, 255, 115, 0.9)"},
		{circleX:circleX + 10, circleY:circleY + 10, circleVX: circleVX * (-1), circleVY: circleVY * (-1) , radius:15, color:"rgba(255, 255, 95, 0.9)"}];
    
	requestAnimationFrame(frame);
	
	function currentTime(){
		return new Date().getTime();
	}
	
	var whenLastFrame = currentTime();

    function drawRect() {
        ctx.fillStyle = "#AD66D5";
        ctx.fillRect(x1, y1, rectWidth, rectHeight);
    }

    function frame() {
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect(); // I`m drawing rectangle

        for(i = 0; i <  balls.length; i++){
            drawframe();
            var now = currentTime();
            var passed = now - whenLastFrame; // прошло между кадрами

            balls[i].circleX = balls[i].circleX + passed * balls[i].circleVX / 1000;
            balls[i].circleY = balls[i].circleY + passed * balls[i].circleVY / 1000;
            checkingBoards();
		}
        whenLastFrame = now;
    }

    function drawframe() {
        ctx.beginPath();
        ctx.arc(balls[i].circleX, balls[i].circleY, balls[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = balls[i].color;
        ctx.fill();
        ctx.strokeStyle = "#A6A600";
        ctx.stroke();
    }

    function checkingBoards(){
        if (balls[i].circleX + balls[i].radius >= rectWidth + x1) {
            balls[i].circleX = balls[i].circleX - 2 * (balls[i].circleX + balls[i].radius - rectWidth - x1)
        	balls[i].circleVX *= -1;
        }
        if (balls[i].circleX - balls[i].radius <= x1) {
            balls[i].circleX = balls[i].circleX + 2 * (x1 - balls[i].circleX + balls[i].radius);
            balls[i].circleVX *= -1;
        }
        if (balls[i].circleY + balls[i].radius >= rectHeight + y1) {
            balls[i].circleY = balls[i].circleY - 2 * (balls[i].circleY + balls[i].radius - rectHeight - y1);
        	balls[i].circleVY *= -1;
        }
        if (balls[i].circleY - balls[i].radius <= y1) {
            balls[i].circleY = balls[i].circleY + 2 * (y1 - balls[i].circleY + balls[i].radius);
            balls[i].circleVY *= -1;
        }
    }
	/*

	
	function frame() {
		requestAnimationFrame(frame);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawRect(); // I`m drawing rectangle
		drawframe(); // I`m drawing circle
	
		var now = currentTime();
		var passed = now - whenLastFrame; // прошло между кадрами
		whenLastFrame = now;
		circleX = circleX + passed * circleVX / 1000; 
		circleY = circleY + passed * circleVY / 1000; 
		checkingBoards()
	}
	
	function checkingBoards(){
		if (circleX >= rectWidth + x1 - 10) {
			circleVX *= -1;
		}
		if (circleX <= x1 + 10) {
			circleVX *= -1;
		}
		if (circleY >= rectHeight + y1 - 10) {
			circleVY *= -1;
		}
		if (circleY <= y1 + 10) {
			circleVY *= -1;
		}
	}
	/*
	var 0 = {x:10, y:20; dx:1; dy:2, color:"red"}
	
	*/
	/*function drawframe() {
		ctx.beginPath();
		ctx.arc(circleX, circleY, 10, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(255, 255, 115, 0.9)";
		ctx.fill();
		ctx.strokeStyle = "#A6A600";
		ctx.stroke();	*/
}