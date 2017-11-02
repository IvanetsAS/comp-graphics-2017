function init() {
    console.info("initialized animation");
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    var TURNCORNER = 0;

    function inRad(num) {
        return num * Math.PI / 180;
    }

    requestAnimationFrame(drawFrame);

    function drawingSingleBladeMill(mill, i) {
        ctx.save();
          ctx.lineWidth = mill.lineWidth;
          ctx.strokeStyle = mill.colorBlade;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(mill.lineLength, 0);
          ctx.stroke();

          if (mill.drawRope) {
              ctx.save();
              ctx.translate(mill.lineLength, 0);
              ctx.rotate(inRad((-360 / mill.num_lines * i) - mill.turningCorner ));

              drawingRope(mill);

              ctx.save();
              ctx.translate(0, mill.ropeLength);
              drawingMill({
                  colorBlade:"blue",
                  num_lines: 30,
                  lineLength: 30,
                  ropeLength: 50,
                  drawRope: false,
                  turningCorner: TURNCORNER * 10,
                  lineWidth: 0.5
              });

              ctx.restore();

              ctx.restore();
          }


        ctx.restore();

        function drawingRope(mill) {
            ctx.save();

            ctx.lineWidth = mill.ropeWidth;
            ctx.strokeStyle = mill.colorRope;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, mill.ropeLength);
            ctx.stroke();

            ctx.restore();
        }
    }

    function drawingMill(mill) {
        ctx.save();

        ctx.rotate(inRad(mill.turningCorner));
        for (var i = 0; i < mill.num_lines; i++) {
            drawingSingleBladeMill(mill, i);
            ctx.rotate(inRad(360 / mill.num_lines));
        }

        ctx.restore();
    }

    function drawFrame() {
        TURNCORNER = TURNCORNER + 0.1;
        requestAnimationFrame(drawFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2 - 50);
        drawingMill({
            colorBlade:"black",
            colorRope: "grey",
            num_lines: 6,
            lineLength: 90,
            ropeLength: 70,
            lineWidth: 6,
            ropeWidth: 1,
            drawRope: true,
            turningCorner: TURNCORNER
        });
        ctx.restore();
    }

    function currentTime() {
        return new Date().getTime();
    }

    var whenLastFrame = currentTime();

    var program_start_time = new Date().getTime();
}