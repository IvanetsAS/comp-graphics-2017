function init() {
	console.info("initialized"); //console.log, info, error, war, debug
	var stage = new createjs.Stage("game");
	//вместо canvas и ctx мы пользуемся stage
	//game - это id нашего canvas
	//мы по-хорошему теперь не должны сами использовать этот canvas


	//создаем объекты, который можно положить на сцену
	//Shape - это объекты с рисунками из базовых элементом, т.е. линий, кругов и т.п.

    var circle = new createjs.Shape();
    stage.addChild(circle); // Добавить на сцену!

    circle
		.graphics // - это аналог ctx, т.е. холст для рисования
		.beginFill("DeepSkyBlue") // теперь рисуй, закрашивая этим цветом (в скобках нужно указать)
		.drawCircle(0, 0, 50);  // нарисуй круг с центром в (0, 0) и радиусом 50

	//указываем кругу, где ему находиться внутри своего контейнера, в нашем случае внутри сцены
    circle.x = 100;
    circle.y = 100;


    //Дорисуем что-нибудь на shape, еще один круг в центре, другим цветом
	var circleG = circle.graphics;
	circleG.beginFill("Navy");
	circleG.drawCircle(10, -10, 10);


	var rect = new createjs.Shape();
	stage.addChild(rect);

	rect.graphics
		.setStrokeStyle(10) //толщина
		.beginStroke("yellow")
		.drawRect(-40, -40, 80, 80);

	rect.x = 100;
	rect.y = 100;
	rect.rotation = 45; //поворот
	rect.compositeOperation = "difference";

	//Добавим на сцену еще картинку:
	// Так можно, но face.png не успеет загрузиться до stage.update(); обсудим в другой раз
	var b = new createjs.Bitmap("face.png");

	//Давайте добавим на сцену текст
	var txt = new createjs.Text("С днем рождения!");
	stage.addChild(txt);
	txt.font = "42px Arial";
	txt.color = "red";
	txt.x = 250;
	txt.y = 100;
	txt.textAlign = "center";
	txt.textBaseline = "alphabetic";

    stage.update(); // только в этот момент происходит рисование
					// все остальные функции просто говорят, что нужно нарисовать

	//Давайте сделаем так, чтобы при нажатие на круг он перемещается

	circle.addEventListener(/*добавить слушателя*/
	"click",
		function () {
			//переместить круг на 10 вправо
			circle.x += 10;
            stage.update();
        }
	)
}