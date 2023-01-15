window.addEventListener("DOMContentLoaded", function() {
	'use strict';
	
	//Humberger
	const humburgerBtn = document.querySelector('.humberger');
	const menuHeader = document.querySelector('.header__menu');
	const menuLink = document.querySelectorAll('.header__nav-link');

	humburgerBtn.addEventListener('click', (event) => {
		event.target.closest('.humberger').classList.toggle('active');
		menuHeader.classList.toggle('header__menu-active');
		document.body.classList.toggle('stop__scroll');
	}); 

	menuLink.forEach(link => {
		link.addEventListener('click', () => {
			humburgerBtn.classList.remove('active');
			menuHeader.classList.remove('header__menu-active');
			document.body.classList.remove('stop__scroll');
		});
	});

	//Slider
	let slideIndex = 1;
	let slides = document.querySelectorAll('.header__slider-item');
	let dotsInner = document.querySelector('.header__dots');
	let dots = document.querySelectorAll('.header__dot');

	showSlides(slideIndex);

	function showSlides(n) {
		if(n > slides.length) {
			slideIndex = 1;
		}
		if(n < 1) {
			slideIndex = slideIndex.length;
		}

		slides.forEach((item) => item.style.display = 'none');
		dots.forEach((item) => item.classList.remove('header__dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('header__dot-active');
	}

	function currentSlide(n) {
		showSlides(slideIndex = n);
	}

	dotsInner.addEventListener('click', (event) => {
		for(let i = 0; i < dots.length +1; i++) {
			if(event.target.classList.contains('header__dot') && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});

	function pluseSlide(n) {
		showSlides(slideIndex +=n);
	}

	let pause = false;

	function animateSlide() {
		pause = setInterval(() => {
			pluseSlide(1);
		}, 5000);
	}
	animateSlide();

	slides[0].parentNode.addEventListener('mouseenter', () => {
		clearInterval(pause);
	});

	slides[0].parentNode.addEventListener('mouseleave', () => {
		animateSlide();
	});

	// Video
	const btnVideo = document.querySelector('.video__box');
	const overlay = document.querySelector('.overlay');
	const btnCloseVideo = document.querySelector('.close'); 

	const tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";

	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	let player;
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
			height: '100%',
			width: '100%',
			videoId: 'tw4jkyfY4HE',
			events: {
				'onReady': onPlayerReady,
			}
		});
	}

	function onPlayerReady(event) {
		event.target.playVideo();
	}
	
	function bindTriggers() {
		btnVideo.addEventListener('click', () => {
			overlay.style.display = 'block';
			onYouTubeIframeAPIReady();
			document.body.style.overflow = 'hidden';
		});
	}
	bindTriggers();

	function bindCloseVideo() {
		btnCloseVideo.addEventListener('click', () => {
			overlay.style.display = 'none';
			document.body.style.overflow = '';
			player.stopVideo();
		});
	}
	bindCloseVideo();

	// ниже ваиант плеера через конструктр классов
	// class VideoPlayer {
	// 	constructor (trigger, overlay) {
	// 		this.btnVideo = document.querySelectorAll(trigger);
	// 		this.overlay = document.querySelector(overlay);
	// 		this.btnClose = this.overlay.querySelector('.close');
	// 	}
		
	// 	bindTrigger() {
	// 		this.btnVideo.forEach(btn => {
	// 			btn.addEventListener('click', () => {
	// 				if(document.querySelector('ifram#player')) {
	// 					this.overlay.style.display = 'flex';
	// 				} else {
	// 					const path = btn.getAttribute('data-url');
	// 					this.createPlayer(path);
	// 				}
	// 			});
	// 		});
	// 	}

	// 	bindCloseVideo() {
	// 		this.btnClose.addEventListener('click', () => {
	// 			this.overlay.style.display = 'none';
	// 			this.player.stopVideo();
	// 		});
	// 	}

	// 	createPlayer(url) {
	// 		this.player = new YT.Player('player', {
	// 				height: '100%',
	// 				width: '100%',
	// 				videoId: `${url}`,
	// 				// events: {
	// 				//     //'onready': onPlayerReady,    это событие не используем
	// 				//     'onStateChange': this.onPlayerStateChange     //событие отслеживает работу плеера (this используем т.к. находимся внутри класса)
	// 				// }
	// 		});

	// 		this.overlay.style.display = 'block';
	// }
		
	// 	init() {
	// 		if(this.btnVideo.length > 0) {                               
	// 			const tag = document.createElement('script');

	// 			tag.src = "https://www.youtube.com/iframe_api";
	// 			const firstScriptTag = document.getElementsByTagName('script')[0];
	// 			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 			this.bindTrigger();
	// 			this.bindCloseVideo();
	// 		}
	// 	}
	// }

	// new VideoPlayer('.video__box', '.overlay').init();

});