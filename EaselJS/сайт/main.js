

function init() {
    console.info("initialized"); //console.log, info, error, war, debug

	function toRad(t) {
		return t * Math.PI / 180;
    }

    function toDeg(t) {
        return t * 180 / Math.PI;
    }

    function max() {
	    var max = arguments[0];
        for (var i = 0; i < arguments.length; i++)
            if (arguments[i] > max)
                max = arguments[i];
        return max;
    }

    function sum() {
	    var sum = 0;
	    for(var i = 0; i < arguments.length; i++)
	        sum = sum + arguments[i];
	    return sum
    }

    function toXCoords(coord) {
        return coord - beginPoint.x
    }

    function toYCoords(coord) {
        return  coord - beginPoint.y
    }

        var canvas = document.getElementById("game");

    var stage = new createjs.Stage("game");
//    stage.autoClear = false;



    var sector1 = new createjs.Shape();
    var sector2 = new createjs.Shape();
    var sector3 = new createjs.Shape();
    var sector4 = new createjs.Shape();
    var sector5 = new createjs.Shape();
    var sector6 = new createjs.Shape();

    var radius = canvas.width;
    //var radius = 100;
    var beginPoint = {x: canvas.width/2 , y: canvas.height};

    var animator = {angleChanger: 30, active: null};
    // Twin.create(object, 'angle', Math.PI);
    //createjs.Ticker()



    //stage.addEventListener('tick', )

    var sectors = [
		{shape: sector1, color: "blue", x0: beginPoint.x, y0: beginPoint.y, x1:null, y1:null, x2:null, y2: null, angle: null},
		{shape: sector2, color: "green", x0: beginPoint.x, y0: beginPoint.y, x1:null, y1:null, x2:null, y2: null, angle: null},
		{shape: sector3, color: "yellow", x0: beginPoint.x, y0: beginPoint.y, x1:null, y1:null, x2:null, y2: null, angle: null},
		{shape: sector4, color: "red", x0: beginPoint.x, y0: beginPoint.y, x1:null, y1:null, x2:null, y2: null, angle: null},
		{shape: sector5, color: "orange", x0: beginPoint.x, y0: beginPoint.y, x1:null, y1:null, x2:null, y2: null, angle: null},
		{shape: sector6, color: "blue", x0: beginPoint.x, y0: beginPoint.y, x1:null, y1:null, x2:null, y2: null, angle: null}
    ];

    calculateStartCoordinates();
    drawSectorsOnStage();

    function drawSector(sector) {
        sector.shape.graphics.clear();
        sector.shape.graphics
            .setStrokeStyle(2) //толщина
            .beginStroke("black")
            .beginFill(sector.color)
            .moveTo(0, 0)
            .lineTo(sector.x1 , sector.y1)
            .lineTo(sector.x2 , sector.y2)
            .lineTo(0, 0);
    }

    function calculateAngle(numberOfSectors, wholeAngle) {
        return toRad(wholeAngle / numberOfSectors)
    }

    function calculateCoordinates(sector, startAngle, i) {
        sector.x1 = 2 * radius * Math.cos((sector.angle ) * (i + 1) + startAngle);
        sector.y1 = -2 * radius * Math.sin((sector.angle) * (i + 1) + startAngle);

        sector.x2 = 2 * radius * Math.cos((sector.angle) * i  + startAngle);
        sector.y2 = -2 * radius * Math.sin((sector.angle) * i  + startAngle);
    }

    function calculateStartCoordinates() {
        for (var i = 0; i < sectors.length; i++){

            sectors[i].angle = calculateAngle(sectors.length, 180);

            calculateCoordinates(sectors[i], 0, i);

        }
    }


    function drawSectorsOnStage(){
        for (var i = 0; i < sectors.length; i++){
            //console.log(i + "draw" + sectors[i].color);
            drawSector(sectors[i]);

            //console.log(sectors[i].x1, sectors[i].y1);

            //Adding sector to stage
            sectors[i].shape.x = sectors[i].x0 ;
            sectors[i].shape.y = sectors[i].y0;
            stage.addChild( sectors[i].shape );
        }
        stage.update();
    }

    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener(
        'tick',
        function(e) {
            stage.update();
            //calculateStartCoordinates();
            transformSelection(animator.active);
        }
    );


    stage.addEventListener('click', function(e) {
        clickX = toXCoords(stage.mouseX);
        clickY = toYCoords(stage.mouseY);

        for (var i = 0; i < 6; i++){
            var a = (0 - clickX) * (sectors[i].y1 - 0) - (sectors[i].x1 - 0) * (0 - clickY);
            var b = (sectors[i].x1 - clickX) * (sectors[i].y2 - sectors[i].y1) - (sectors[i].x2 - sectors[i].x1) * (sectors[i].y1 - clickY);
            var c = (sectors[i].x2 - clickX) * (0 - sectors[i].y2) - (0 - sectors[i].x2) * (sectors[i].y2 - clickY);

            if ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0))
            {
                animator.angleChanger = toDeg(sectors[i].angle);
                console.log(toDeg(sectors[i].angle));
                var t = createjs.Tween.get(animator, {loop: false});
                t.to({angleChanger:105}, 1200, createjs.Ease.backInOut);
                console.log(sectors[i].color);
                animator.active = i;
                break;
            }
        }
    });

    function groupSectors(indexOfActive) {
        var firstGroup = [];
        var secondGroup = [];
        //console.log("!!!!" + sectors[indexOfActive] + ' ' + indexOfActive);
        for (var i = 0; i < sectors.length; i++)
            if ( i < indexOfActive )
                firstGroup.push(sectors[i]);
            else
            if ( i > indexOfActive)
                secondGroup.push(sectors[i]);
        return {
            group1: {
                sectorsList: firstGroup,
                angle: null,
                singleSectorAngle: null
            },
            group2: {
                sectorsList: secondGroup,
                angle: null,
                singleSectorAngle: null
            },
            active:{
                activeSector: sectors[indexOfActive],
                angle: null
            }
        }
    }

    //Вычисление новых углов для секторов и для их "групп"-оберток
    function calculateNewAngles(newSectorsGroup) {

        changeAngle(animator.angleChanger);

        /*newSectorsGroup.active.angle = (sectors.length - 1) * sectors[0].angle + sectors[0].angle * 2;
        newSectorsGroup.active.activeSector.angle = (sectors.length - 1) * sectors[0].angle + sectors[0].angle * 2;
        */

        newSectorsGroup.group1.singleSectorAngle = sectors[0].angle;
        newSectorsGroup.group2.singleSectorAngle = sectors[0].angle;
        newSectorsGroup.group1.angle =  newSectorsGroup.group1.sectorsList.length * newSectorsGroup.group1.singleSectorAngle;
        newSectorsGroup.group2.angle = newSectorsGroup.group2.sectorsList.length * newSectorsGroup.group2.singleSectorAngle;

        newSectorsGroup.active.angle = toRad(animator.angleChanger);
        newSectorsGroup.active.activeSector.angle = toRad(animator.angleChanger);

        //console.log(toDeg(sectors[0].angle), toDeg(newSectorsGroup.active.angle), toDeg(newSectorsGroup.group1.angle), toDeg(newSectorsGroup.group2.angle));
    }

    //Уменьшить углы у объектов
    function devideAngle(divider){
        for (var i = 0; i < 6; i++){
            sectors[i].angle = sectors[i].angle / divider;
        }
    }

    function changeAngle(changer) {
        for (var i = 0; i < 6; i++){
            sectors[i].angle = (toRad(180) - toRad(changer)) / (sectors.length - 1);
        }
    }

    //Посчитать новые координаты
    function calculateTransformedCoordinates(newSectorsGroup) {
        for (var i = 0; i < newSectorsGroup.group1.sectorsList.length; i++){
            calculateCoordinates(newSectorsGroup.group1.sectorsList[i], 0, i)
        }
        calculateCoordinates(newSectorsGroup.active.activeSector, newSectorsGroup.group1.angle, 0);
        for (var j = 0; j < newSectorsGroup.group2.sectorsList.length; j++){
            calculateCoordinates(newSectorsGroup.group2.sectorsList[j], newSectorsGroup.group1.angle + newSectorsGroup.active.activeSector.angle, j)
        }
    }

    function transformSelection(indexOfActive) {
        if (indexOfActive != null){
            var transformingGroup = groupSectors(indexOfActive);
            calculateNewAngles(transformingGroup);
            calculateTransformedCoordinates(transformingGroup);
            drawSectorsOnStage();
        }
    }


}














/*

if (
    (
        (
            (sectors[i].y2 - sectors[i].y0) * clickX + (sectors[i].x2 - sectors[i].x0) * clickY +
            (sectors[i].x0 * sectors[i].y2 - sectors[i].x2 * sectors[i].y0) >=0
        ) && (
            (sectors[i].y1 - sectors[i].y0) * clickX + (sectors[i].x1 - sectors[i].x0) * clickY +
            (sectors[i].x0 * sectors[i].y1 - sectors[i].x1 * sectors[i].y0) <=0
        )
    ) || (
        (
            (sectors[i].y2 - sectors[i].y0) * clickX + (sectors[i].x2 - sectors[i].x0) * clickY +
            (sectors[i].x0 * sectors[i].y2 - sectors[i].x2 * sectors[i].y0) <= 0
        ) && (
            (sectors[i].y1 - sectors[i].y0) * clickX + (sectors[i].x1 - sectors[i].x0) * clickY +
            (sectors[i].x0 * sectors[i].y1 - sectors[i].x1 * sectors[i].y0) >=0
        )
    )
)
    console.log(sectors[i].color)*/
