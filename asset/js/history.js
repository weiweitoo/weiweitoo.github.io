// For history.api
// $(document).ready(function(){	
// 	var url = '';
// 	var title = "Too";
// 	history.pushState({
// 		url : url ,
// 		title : title
// 	}, title, url );
// });

$(function () {
	// Check for popstate event
	$(window).on('popstate', function (e) {
		var state = e.originalEvent.state;
		if (state !== null) {
			if(state.url !== currentPath)
			{
				document.title = state.title;
				$('#main-wrapper').css('opacity','0');
				window.setTimeout(function(){
					$('#main-wrapper').load(state.url + " #inner-wrapper");
					$('#main-wrapper').css('opacity','1');
				},1000);
			}
		} else {
			document.title = state;
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