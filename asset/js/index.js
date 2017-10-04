$(document).ready(function() {
	animationScrollSlide(0);
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
	var tagline = ['I','n','s','p','i','r','e','d',' ','B','y',' ','C','o','d','e'];
	var taglineobj = $(".tagline");
	const TEXTADDINGSPEED = 130;
	const TEXTBASESPEED = 500;
	for (var i = 0; i < tagline.length; i++) {
		addText(i);
	}
	function addText(index){
		setTimeout(function(){
			var temp = taglineobj.text() + tagline[index];
			taglineobj.text(temp);
		},TEXTBASESPEED + (TEXTADDINGSPEED * index));
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

	ToggleNav(0);
	
});
