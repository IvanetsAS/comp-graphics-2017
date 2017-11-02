function init() {
	console.info("initialized animation");
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext('2d'); 

	var yandex = document.getElementById("yandexLogo");
    var google = document.getElementById("googleLogo");
	//создаем новый еще не существующий <img>
    var pickachu = new Image();
    pickachu.src = "img.jpg";

    // рисование на canvas - это метод drawImage
	// 1 где нарисовать
	ctx.drawImage(google, 100, 100);
	ctx.drawImage(google, 120, 120);


	//2) где нарисовать, новый размер
    ctx.drawImage(google, 200, 200, 100, 100);

    // кстати как узнать размер
	console.log(google.width, google.height);

	//3) можно рисовать часть изображения
	//координаты внутри картинки
	//ширину и высоту внутри картинки
	//где нарисовать
	//ширина и высота, которой рисовать

	ctx.drawImage(google,
		88, 0, // координаты внутри
		88, 88, // размер внутри картинки
		300, 200, //где рисовать
		160, 160 // размер рисования
		);
	// а теперь картинку яндекса попробуем
	ctx.drawImage(yandex, 0, 0)
	// Получилось! Но могло не получиться, тк
	//1) это картинка с другого домена, он может запретить ее загружать в canvas
	//2) Даже, если мы нарисовали картинку из другого домена, окажется, что мы потеряем возможность анализировать
	// сожержимое canvas
	ctx.drawImage(pickachu, 200, 0)
	// не рисуется, потому что еще не загрузился
	setTimeout(function () {
        ctx.drawImage(pickachu, 200, 0)
    }, 1000);
	//Раньше мы в setTimeout казывали уже существующую функцию, но мы здесь указали анонимную функцию, созданную прямо
	// внутри setTimeout
}