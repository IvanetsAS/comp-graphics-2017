function init() {
    console.info("initialized animation");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    var ALIVE = 1;
    var BOOMED = 0;
    /* <CONSTS> */
    var circleX = canvas.width / 2;
    var circleY = canvas.height / 2;
    var circleVX = 50;
    var circleVY = 60;
    var rectWidth = canvas.width - 50;
    var rectHeight = canvas.height - 10;
    var x1 = circleX - rectWidth / 2;
    var y1 = circleY - rectHeight / 2;
    var i;
    // ballsAliveImage = document.getElementById("balls");
    var FRAMES_PER_SECOND /*FPS*/ = 24;
    /* </CONSTS> */

    var balls = [];

    /* <LISTENER> */
    canvas.addEventListener(
        'mousedown', //момент нажатия
        function (e) {
            var enterBall = false;
            for (var ballName in balls) {
                var ball = balls[ballName];
                if (
                    e.offsetX >= ball.circleX - ball.radius && e.offsetX <= ball.circleX + ball.radius
                    &&
                    e.offsetY >= ball.circleY - ball.radius && e.offsetY <= ball.circleY + ball.radius
                ) {
                    balls[ballName].state = BOOMED;
                    /*balls.splice(ballName, 1);
                    console.log('deleted');
                    */
                    enterBall = true;
                }
            }
            if (!enterBall) {
                balls[balls.length] = {
                    circleX: e.offsetX, circleY: e.offsetY,
                    circleVX: circleVX * (-1), circleVY: circleVY * (-1),
                    radius: 15,
                    ballsBoomImage: document.getElementById("boom"),
                    ballsAliveImage: document.getElementById("balls"), x0: 0, y0: 50, by0:0,// координаты на картинке картинке
                    width: 50, height: 50, // размеры кадра
                    boomWidth: 100, boomHeight:100,
                    num: 10, boomNum:34, state: ALIVE, boomFrame : 0
                };
            }
        }
    );
    /* </LISTENER> */

    requestAnimationFrame(drawFrame);

    var frame = 0;
    var frame1 = 0;


    function drawFrame() {
        requestAnimationFrame(drawFrame);

        var current_time = new Date().getTime();
        var time_from_start = current_time - program_start_time;
        frame = Math.round(time_from_start / 1000 * FRAMES_PER_SECOND);
        var passed = (current_time - whenLastFrame) / 1000; // прошло между кадрами в секундах

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect(); // I`m drawing rectangle

        for (i = 0; i < balls.length; i++) {
            //рисуем один кадр, в нашем случае рисуем один кадр с мячиком.
            if (balls[i].state === ALIVE){
                drawAliveBall();
            }
            balls[i].circleX = balls[i].circleX + passed * balls[i].circleVX;
            balls[i].circleY = balls[i].circleY + passed * balls[i].circleVY;
            checkingBoards();
            if (balls[i].state === BOOMED){
                drawBoomedBall();
            }

        }

        whenLastFrame = current_time;
    }

    function drawRect() {
        ctx.drawImage(
            document.getElementById("plane"),
            0, 0, // координаты на картинке
            480, 300, //размеры на картинке
            0, 0, //где рисовать на canvas
            //balls[i].width, balls[i].height
            canvas.width, canvas.height //размеры рисования
        )
    }

    function drawAliveBall() {
        var sprite_x = balls[i].x0 + balls[i].width * (frame % balls[i].num);
        ctx.drawImage(
            balls[i].ballsAliveImage,
            sprite_x, balls[i].y0, // координаты на картинке
            balls[i].width, balls[i].height, //размеры на картинке
            balls[i].circleX - balls[i].radius, balls[i].circleY - balls[i].radius, //где рисовать на canvas
            //balls[i].width, balls[i].height
            balls[i].radius * 2, balls[i].radius * 2 //размеры рисования
        )
    }

    function drawBoomedBall() {
        if (balls[i].boomFrame < balls[i].boomNum){
            var sprite_x = balls[i].boomWidth * (balls[i].boomFrame);
            ctx.drawImage(
                balls[i].ballsBoomImage,
                sprite_x, balls[i].by0, // координаты на картинке
                balls[i].boomWidth, balls[i].boomHeight, //размеры на картинке
                balls[i].circleX - balls[i].radius, balls[i].circleY - balls[i].radius, //где рисовать на canvas
                //balls[i].width, balls[i].height
                balls[i].radius * 2, balls[i].radius * 2 //размеры рисования
            );
            balls[i].boomFrame++;
        } else {
            balls.splice(i, 1);
        }

    }

    function currentTime() {
        return new Date().getTime();
    }

    var whenLastFrame = currentTime();

    function checkingBoards() {
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


    //время момента начала программы

    var program_start_time = new Date().getTime();

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