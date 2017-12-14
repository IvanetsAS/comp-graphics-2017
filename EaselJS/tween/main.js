function init() {
    console.info("initialized");
    var stage = new createjs.Stage("game");

// описываем набор объектов сцены

//stage.update(); //момент рисования

//Как сделать, чтобы рисование сцены
//происходило несколько раз в секунду.
//Объект Ticker:

//хотим 30 кадров (тиков) в секунду
    createjs.Ticker.framerate = 30;
    createjs.Ticker.timingMode =
        createjs.Ticker.RAF_SYNCHED;

    var clickX;
    var clickY;

    createjs.Ticker.addEventListener(
        'tick',
        stage //это аналогично предыдущему
    );



//пусть шарик сам себя анимирует
/*
    shape.addEventListener('tick',
        function(e) {
            shape.x += 1;
            shape.y += 1;
        }
    );
*/

    //А теперь давайте обсудим библиотеку tween.js, еще один способ анимации. Будем говорить, какой параметр какому
    // объекту менять в течение какого-то времени и по какому закону

    //подключить надо библиотеку Tween.js, аналогично easel.js в html

    //Еще какой-нибудь объект добавим, будем его анимировать с помощью TweenJS
    var back = new createjs.Shape();
    stage.addChild(back);
    back.graphics.beginFill("White")
        .drawRect(0, 0, 1000, 1000);
    var myCircle = new createjs.Shape();

    myCircle.x = 200;
    myCircle.y = 100;

    stage.addChild(myCircle);
    myCircle.graphics.beginFill("Crimson")
        .beginStroke("Black")
        .drawCircle(0, 0, 10);


    //Чтобы заставить объект изменять какой-то параметр, нужно созать Твин, это делает функция get
    //В get указываем объект анимаци и доп. настройки, например

    //.to(); // что менять, колько по времени, до какого значения и по какому закону


    stage.addEventListener('stagemousemove', function(e) {
        clickX = stage.mouseX;
        clickY = stage.mouseY;
        console.log(stage.mouseX, stage.mouseY);
        var t = createjs.Tween.get(myCircle, {loop: false});
        t.to({x:clickX, y:clickY},400, createjs.Ease.backInOut);
        var d = createjs.Tween.get(myCircle1, {loop: false});
        d.to({x:clickX, y:clickY},600, createjs.Ease.cubicInOut);
        var l = createjs.Tween.get(myCircle2, {loop: false});
        l.to({x:clickX, y:clickY},800, createjs.Ease.cubicInOut);
    });


    var myCircle1 = new createjs.Shape();

    myCircle1.x = 200;
    myCircle1.y = 100;

    stage.addChild(myCircle1);
    myCircle1.graphics.beginFill("Blue")
        .beginStroke("Black")
        .drawCircle(0, 0, 10);

    var myCircle2 = new createjs.Shape();

    myCircle2.x = 200;
    myCircle2.y = 100;

    stage.addChild(myCircle2);
    myCircle2.graphics.beginFill("Green")
        .beginStroke("Black")
        .drawCircle(0, 0, 10);



    //Чтобы заставить объект изменять какой-то параметр, нужно созать Твин, это делает функция get
    //В get указываем объект анимаци и доп. настройки, например

    //.to(); // что менять, колько по времени, до какого значения и по какому закону


    /* В методе to указываются параметры, которые изменяются одновременно. Следующий метод говорит, что сделать потом,
    когда закончится предыдущая анимация */

    /* метод call позволяет сделать вызов вашей собственной функции в соответствующий момент*/
}