$(function () {
	// Check for popstate event, trigged when browser back and forward button click
	window.addEventListener("popstate", function(e) {
		var state = location.pathname;
		if (state !== null) {
			if(state !== currentPath)
			{
				// document.title = state.title;
				$('#main-wrapper').css('opacity','0');
				window.setTimeout(function(){
					$('#main-wrapper').load(state + " #inner-wrapper");
					$('#main-wrapper').css('opacity','1');
				},1000);
			}
		} else {
			// document.title = state;
			console.log("Empty state - Error to navigate");
		}
	});
});


////////////////////////////////////////////////////////
// Call the correct document.ready function after ajax load
///////////////////////////////////////////////////////
$(document).ajaxComplete(function(){
	updateCurrPath();
	if(currentPath == "" || currentPath == "index.html"){
		indexReady();
	}
	else if (currentPath == "project.html"){
		projectReady();
	}
})