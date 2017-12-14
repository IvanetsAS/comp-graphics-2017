
function init() {

	console.info("initialized"); //console.log, info, error, war, debug
	var stage = new createjs.Stage("game");
	//вместо canvas и ctx мы пользуемся stage
	//game - это id нашего canvas
	//мы по-хорошему теперь не должны сами использовать этот canvas


	//создаем объекты, который можно положить на сцену
	//Shape - это объекты с рисунками из базовых элементом, т.е. линий, кругов и т.п.




	var home = new createjs.Shape();


    var homeUp = new createjs.Shape();

    homeUp.graphics
		.setStrokeStyle(5)
		.beginStroke("black")
        .beginFill("white")
        .drawRect(-40 / Math.sqrt(2), -40 / Math.sqrt(2), 80 / Math.sqrt(2) , 80 / Math.sqrt(2));

	home.graphics
		.setStrokeStyle(5) //толщина
		.beginStroke("black")
		.beginFill("white")
		.drawRect(-40, -40, 80, 80);

	home.x = 250;
	home.y = 200;

	homeUp.x = 250;
	homeUp.y = 160;
	homeUp.rotation = 45;


    stage.addChild(homeUp);
    stage.addChild(home);
    stage.update(); // только в этот момент происходит рисование
					// все остальные функции просто говорят, что нужно нарисовать

	//Давайте сделаем так, чтобы при нажатие на круг он перемещается


}