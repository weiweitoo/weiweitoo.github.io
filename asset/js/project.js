$(document).ready(function(){
	$("html, body").animate({ scrollLeft: 0 });

	$('.item-title').css('opacity',1);
	setTimeout(function(){
		$('.item-content').css('opacity',1);

	},500);

});



// For scrolling Animation
$(window).scroll(function() {
	var scrollX = $(this).scrollLeft();

	var animationSlide1 = calScrollLeftTransValue($('#project-1'),scrollX);
	var animationSlide2 = calScrollLeftTransValue($('#project-2'),scrollX);
	var animationSlide3 = calScrollLeftTransValue($('#project-3'),scrollX);
	var animationSlide4 = calScrollLeftTransValue($('#project-4'),scrollX);

	$('#project-1').css('opacity',animationSlide1);
	$('#project-2').css('opacity',animationSlide2);
	$('#project-3').css('opacity',animationSlide3);
	$('#project-4').css('opacity',animationSlide4);

	foo('#project-1',animationSlide1);
	foo('#project-2',animationSlide2);
	foo('#project-3',animationSlide3);
	foo('#project-4',animationSlide4);

});



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