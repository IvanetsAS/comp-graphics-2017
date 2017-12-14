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

    /*
    createjs.Ticker.addEventListener(
    'tick',
    function(e) {
    //console.log('tick', e);
    stage.update(); //постоянная
    //перерисовка
    }
    );
    */

    createjs.Ticker.addEventListener(
        'tick',
        stage //это аналогично предыдущему
    );

//Bitmap - это картинка
    var b = new createjs.Bitmap('yandex.png');

    stage.addChild(b); //добавили на сцену

//Sprite - это меняющаяся картинка

//SpriteSheet - информация о картинке
//и о кадрах на ней
    var sheet = new createjs.SpriteSheet({
        images: ["pokeballs.png"],
        frames: {
            width: 64,
            height: 64,
            regX: 32, //где центр кадра
            regY: 32,
            spacing: 0, //пропуск между кадрами
            count: 12 * 4
        },
        animations: { //кадры для разных действий
            rotate: [0, 12 * 4 - 1],
            rotate1: [0, 5], //с 0 по 5
            rotate2: [6, 11, "stay"],
//с 6 по 11, а потом stay
            stay: 11 //из 1 кадра
        },
        framerate: 10
    });

    var sprite = new createjs.Sprite(sheet);

    stage.addChild(sprite);
    sprite.x = 280;
    sprite.y = 110;
//sprite.play();
    sprite.gotoAndPlay("rotate");

    var shape = new createjs.Shape();
    shape.graphics.beginFill("#FFAA55")
        .drawCircle(0, 0, 23);
    stage.addChild(shape);

//пусть шарик сам себя анимирует
    shape.addEventListener('tick',
        function(e) {
            shape.x += 1;
            shape.y += 1;
        }
    );

    //А теперь давайте обсудим библиотеку tween.js, еще один способ анимации. Будем говорить, какой параметр какому
    // объекту менять в течение какого-то времени и по какому закону

    //подключить надо библиотеку Tween.js, аналогично easel.js в html

    //Еще какой-нибудь объект добавим, будем его анимировать с помощью TweenJS

    var cat = new createjs.Shape();

    cat.x = 200;
    cat.y = 100;
    cat.r = 30;
    stage.addChild(cat);
    Object.defineProperty(cat, 'r',{
        set : function (value) {
            //нарисовать кота нужного радиуса
            cat.graphics.beginFill("Crimson")
                .beginStroke("Black")
                .drawCircle(0, 0, value);
            cat._r = value;
        }
    });

    //Чтобы заставить объект изменять какой-то параметр, нужно созать Твин, это делает функция get
    //В get указываем объект анимаци и доп. настройки, например
    var t = createjs.Tween.get(cat, {loop: true});
    //.to(); // что менять, колько по времени, до какого значения и по какому закону
    t.to({x:300, y:300, alpha: 0, r: 20},1000, createjs.Ease.backInOut)
        .to({x: 200, y: 100, alpha: 1, r: 10}, 1000)
                            //менять x и y до 300
                            //2 - закон изменения
        .call(function () {
            console.log('loop');
        });

    cat.addEventListener('click', function() {
        t.pause();
        console.log('cat clicked');
    })

    /* В методе to указываются параметры, которые изменяются одновременно. Следующий метод говорит, что сделать потом,
    когда закончится предыдущая анимация */

    /* метод call позволяет сделать вызов вашей собственной функции в соответствующий момент*/
}