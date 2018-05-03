// For index.html
var screenY = 1;
var maxscreenY = 3;
var path;	// to determice which javascript to run later
var currentPath;

function ToggleNav(screen){
	var navitem = $('.nav-bar').find('ul').children();
	var target = navitem[screen].getElementsByTagName('span')[0];
	
	if(target.style.opacity == 0.8){
		target.style.opacity = 0;
	}
	else{
		target.style.opacity = 0.8;
	}
}

function calScrollLeftTransValue(ScrollingElement,scrollleft){
	var slideheight = ScrollingElement.height();
	var innerheight =window.innerHeight;
	var j = (scrollleft + innerheight);
	var f = ScrollingElement.offset().left + slideheight;
	var result = j/f;
	return result;
}

function calScrollTopTransValue(ScrollingElement,scrolltop){
	var slideheight = ScrollingElement.height();
	var innerheight =window.innerHeight;
	var j = (scrolltop + innerheight);
	var f = ScrollingElement.offset().top + slideheight;
	var result = j/f;
	return result;
}

function animationScrollSlide(y){
	var index = y -1;
	$("html, body").animate({ scrollTop: (index * window.innerHeight) });
}

function nextSlide(){
	if(screenY <maxscreenY){
		animationScrollSlide(screenY + 1);
	}
}

function previousSlide(){
	if(screenY >= 0){
		animationScrollSlide(screenY - 1);
	}
}

function indexReady(){
	$('body').css('overflow','scroll');
	animationScrollSlide(0);
	ToggleNav(0);
	// Initializing	! important since it use ajax wont auto initializing
	screenY = 1;
	////////////////////////////////////
	// Movement of background
	////////////////////////////////////
	var movementStrength = 20;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();

	$(".blacklayer").mousemove(function(e){
	  var pageX = e.pageX - ($(window).width() / 2);
	  var pageY = e.pageY - ($(window).height() / 2);
	  var newvalueX = width * pageX * -1;
	  var newvalueY = height * pageY * -1;
	  var result = "translateX(calc(-50% + " + newvalueX +"px))" + " translateY(calc(-50% + " +newvalueY+"px))";
	  $('.background').css("transform", result);
	});

	//////////////////////////////////////////
	//// Animation of Tagline
	/////////////////////////////////////////
	// Adding the text
	

	function addText(index){
		setTimeout(function(){
			var temp = taglineobj.text() + tagline[index];
			taglineobj.text(temp);
		},TEXTBASESPEED + (TEXTADDINGSPEED * index));
	}

	var tagline = ['I','n','s','p','i','r','e','d',' ','B','y',' ','C','o','d','e'];
	var taglineobj = $(".tagline");
	const TEXTADDINGSPEED = 130;
	const TEXTBASESPEED = 500;
	for (var i = 0; i < tagline.length; i++) {
		addText(i);
	}

	// Doing the input symbol
	var showed = false;
	function toggleInput() {
		if(showed == false)
		{
			taglineobj.css("border-right","2px white solid");
			showed = true;
		}
		else{
			taglineobj.css("border-right","none");
			showed = false;
		}
	};

	(function(count) {
		if (count < 8) {
			toggleInput();
			var caller = arguments.callee;
			window.setTimeout(function() {
				caller(count + 1);
			}, 500);
		}
	})(0);

	//////////////////////////////////////
	//// Nav Bar animation
	/////////////////////////////////////
	var navbar = $(".nav-bar");
	var navitem = navbar.find('ul').children();

	(function(count) {
		if (count < navitem.length) {
			navitem[count].style.opacity = .8;
			navitem[count].style.right = 0;
		
			var caller = arguments.callee;
			window.setTimeout(function() {
				caller(count + 1);
			}, 700);    
		}
	})(0);

	//////////////////////////////////////////
	// For button ajax to load project.html
	///////////////////////////////////////////
	$("#btn-project").on('click' ,function () {
		var $this = $(this);
		var url = $this.attr("href");
		var title = "haha";
		console.log(url);
		// title = $this.attr("data-name");	

		// history.pushState({
		// 	url : url,
		// 	title : title
		// }, title, url);

		// Page Transition
		document.title = title;
		$('#main-wrapper').css('opacity','0');
		window.setTimeout(function(){
			$('#main-wrapper').load(url + " #inner-wrapper");
			$('#main-wrapper').css('opacity','1');
			projectReady();
		},1000);
	});
}

function projectReady(){
	$('body').css('overflow','scroll');
	$("html, body").animate({ scrollTop: 0 });

	//////////////////////////////////
	// For particle.js
	///////////////////////////////////
	particlesJS("particles-js", {
		"particles": {
			"number": {
				"value": 100,
				"density": {
					"enable": false,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.4,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 6,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": false,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 4,
				"direction": "bottom",
				"random": true,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		///////////////////////////
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false,
					"mode": "grab"
				},
				"onclick": {
					"enable": false,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 140,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});

	/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
	particlesJS.load('particles-js', 'asset/particles.json', function() {
	});
}

function updateCurrPath(){
	path = window.location.pathname.split('/');
	currentPath = path[path.length-1];
}

// func is callback after animation end
function preloaderAnimation(func){
	$preloader = $('.preloader');
	$after = $('.preloader .after');
	$before = $('.preloader .before');

	window.onload = function(){
		setTimeout(function(){
			$preloader.css({
				'border-left' : "150px solid rgba(255,255,255,0)",
				'border-right' : "150px solid rgba(0,0,0,0)",
				'box-shadow' : "none"
			});
			setTimeout(function(){
				$after.css('opacity','0');
				$before.css('background','white');

				setTimeout(function(){
					$before.css({
						'border' : 'none',
						'width' : '80px',
						'height' : '80px'
					});
					setTimeout(function(){
						$preloader.css("animation-play-state",'paused');
						$before.css({
							"top" : '50%',
							"left" : '50%',
							"transform" : 'translate(-50%,-50%)'
						});
						setTimeout(function(){
							$before.css({
								'width' : '200px',
								'border-radius' : '8%',
							});
							$preloader.css({
								"animation" : 'none',
							});
							setTimeout(function(){
								$before.find('div').text("Fragon? No?");
								setTimeout(function(){
									$before.css({
										"width" : "0"
									});
									setTimeout(function(){
										$("#main-wrapper").css({
											'display' : "inherit"
										});
										$(".preloader-wrapper").css("display","none");
										setTimeout(function(){
											$('#main-wrapper').css("opacity",'1');
											func();
										},800);
									},1000);
								},1200)
							},600);
						},1000);
					},500);
				},1000);
			},1000);
		},1500);
	}
}

function onscroll(){
	if(currentPath == "" || currentPath == "index.html"){
		var scrollY = $(window).scrollTop();
		if(scrollY >= (window.innerHeight * screenY)){
			var curr = "#slide" + screenY;
			var next = "#slide" + (screenY + 1);
			screenY +=1;
			ToggleNav(screenY-1);	// Create new label, -1 because it start from 0
			ToggleNav(screenY-2);	// Remove original label, -2 because start from 0 and it + 1 already

			$(curr).removeClass('slidemain');
			if(screenY != maxscreenY)
			{
				$(next).addClass('slidemain');
			}
		}
		else if ( (scrollY < (window.innerHeight * (screenY -1))) )	{
			var curr = "#slide" + screenY;
			var prior = "#slide" + (screenY - 1);
			screenY -=1;
			ToggleNav(screenY);	// Create new label, -1 because it start from 0
			ToggleNav(screenY-1);	// Remove original label, -2 because start from 0 and it + 1 already

			$(curr).removeClass('slidemain');
			$(prior).addClass('slidemain');
		}

		// Check for navigation arrow down and up
		if(screenY == maxscreenY){
			$('.nav-down').html('');
		}
		else{
			$('.nav-down').html('keyboard_arrow_down');
		}

		// Check for navigation arrow down and up
		if(screenY == 1){
			$('.nav-up').html('');
		}
		else{
			$('.nav-up').html('keyboard_arrow_up');
		}


		/////////////////////////////////////
		// For scrolling Animation
		/////////////////////////////////////
		var animationSlide2 = calScrollTopTransValue($('#slide2'),scrollY);
		var animationSlide3 = calScrollTopTransValue($('#slide3'),scrollY);

		$('#slide2').css('opacity',animationSlide2);
		$('#slide3').css('opacity',animationSlide3);
	}
	/////////////////////////////////
	// Window scroll event
	////////////////////////////////
	// For scrolling Animation
	else if(currentPath == "project.html"){

	}
}


/////////////////////////////////////////
// For Document ready
////////////////////////////////////////
$(function(){
	updateCurrPath();
	/////////////////////////////////////////
	// For index.html
	////////////////////////////////////////
	if(currentPath == "" || currentPath == "index.html"){
		/////////////////////////////////////
		// Document ready
		/////////////////////////////////////
		$(document).ready(preloaderAnimation(indexReady));
	}
	////////////////////////////////////
	// for project.html
	///////////////////////////////////
	else if (currentPath == "project.html"){

		/////////////////////////////////
		// Document ready
		////////////////////////////////
		$(document).ready(preloaderAnimation(projectReady));
	}
});

/////////////////////////////////
// Window scroll event
////////////////////////////////
$(function(){
	$(window).on('scroll',onscroll);
});
