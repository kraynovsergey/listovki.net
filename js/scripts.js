(function() {
	'use strict';

	/* Меню */
	function navMobile() {
		if ( window.innerWidth < 992 ) {
			const navItems = document.querySelectorAll('.nav__list li._parent');

			navItems.forEach(function(item) {
				item.onclick = function(e) {
					this.classList.toggle('_active');
					e.stopPropagation();
				}

				item.childNodes[0].onclick = function() {
					return false;
				}
			});
		}
	}

	if ( document.querySelector('.nav') && document.querySelector('.header__burger') && document.querySelector('.nav__close') ) {
		const nav = document.querySelector('.nav'),
			headerBurger = document.querySelector('.header__burger'),
			navClose = document.querySelector('.nav__close');

		headerBurger.onclick = function() {
			nav.classList.add('_active');
		}

		navClose.onclick = function() {
			nav.classList.remove('_active');
		}

		navMobile();

		window.onresize = function() {
			navMobile();
		}
	}

	/* Карусель "О компании" на главной странице */
	if ( document.querySelector('.about__carousel-init') ) {
		tns({
			container: '.about__carousel-init',
			items: 1,
			loop: true,
			gutter: 0,
			mouseDrag: true,
			swipeAngle: false,
			speed: 1000,
			nav: true,
			navContainer: '.about__dots',
			controls: true,
			controlsContainer: '.about__arrows'
		});
	}

	/* Спойлеры "Услуги" на главной странице */
	if ( document.querySelector('.services__button') && document.querySelector('.services__item') ) {
		const servicesButtons = document.querySelectorAll('.services__button');

		servicesButtons.forEach(function(item) {
			item.onclick = function() {
				this.closest('.services__item').classList.toggle('_active');
			}
		});
	}

	/* Карусель "Наша команда" */
	if ( document.querySelector('.team__init') ) {
		tns({
			container: '.team__init',
			items: 1,
			loop: true,
			gutter: 35,
			center: true,
			mouseDrag: true,
			swipeAngle: false,
			speed: 1000,
			nav: true,
			navContainer: '.team__dots',
			controls: true,
			controlsContainer: '.team__arrows'
		});
	}

	/* Маска телефона */
	window.addEventListener("DOMContentLoaded", function() {
		if ( document.querySelector('input[type="tel"]') ) {
			[].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
				var keyCode;
				function mask(event) {
					event.keyCode && (keyCode = event.keyCode);
					var pos = this.selectionStart;
					if (pos < 3) event.preventDefault();
					var matrix = "+7 (___) ___-__-__",
						i = 0,
						def = matrix.replace(/\D/g, ""),
						val = this.value.replace(/\D/g, ""),
						new_value = matrix.replace(/[_\d]/g, function(a) {
							return i < val.length ? val.charAt(i++) || def.charAt(i) : a
						});
					i = new_value.indexOf("_");
					if (i != -1) {
						i < 5 && (i = 3);
						new_value = new_value.slice(0, i)
					}
					var reg = matrix.substr(0, this.value.length).replace(/_+/g,
						function(a) {
							return "\\d{1," + a.length + "}"
						}).replace(/[+()]/g, "\\$&");
					reg = new RegExp("^" + reg + "$");
					if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
					if (event.type == "blur" && this.value.length < 5)  this.value = ""
				}
				input.addEventListener("input", mask, false);
				input.addEventListener("focus", mask, false);
				input.addEventListener("blur", mask, false);
				input.addEventListener("keydown", mask, false)
			});
		}
	});

	/* Модальные окна */
	const myModal = new HystModal({
		linkAttributeName: "data-hystmodal"
	});

	/* Политика конфиденциальности */
	if ( document.querySelector('input[name="policy"]') ) {
		let polices = document.querySelectorAll('input[name="policy"]');

		polices.forEach(function(item) {
			item.onchange = function() {
				let formButton = this.closest('form').querySelector('button[type="submit"]');
				if ( item.checked ) {
					formButton.removeAttribute('disabled');
				} else {
					formButton.setAttribute('disabled', 'disabled');
				}
			}
		})
	}

	/* Карта */
	var check_if_load = false;

	function init () {
		const myMapTemp = new ymaps.Map('map', {
			center: [55.72746556899338,37.479986499999946],
			zoom: 16,
			controls: []
		});

		const myPlacemarkTemp = new ymaps.Placemark([55.72746556899338,37.479986499999946], {},
			{preset: "islands#dotIcon", iconColor: '#ec6839'});
		myMapTemp.geoObjects.add(myPlacemarkTemp);
		myMapTemp.behaviors.disable('scrollZoom');

	}

	function loadScript(url, callback){
		const script = document.createElement("script");
		if (script.readyState){  // IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
					script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function(){
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	const ymap = function() {
		if ( document.querySelector('.contacts-page__map') ) {
			if (!check_if_load) {
				check_if_load = true;
				loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
					ymaps.load(init);
				});
			}
		}
	}
	ymap();

})()