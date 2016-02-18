

$(document).ready(function() {
	var id = getParameterByName('auth');
	if(id == undefined || id == ''){
		window.location = "/";
	}
	$('.validate').each(function(){
	  var href = $(this).attr('href');

	  if(href.indexOf('?') >=0){ //has other queries
	  	href = href + '&auth='+id;
	  }else{
	  	href = href + '?auth='+id;
	  }

	  $(this).attr("href", href);
	  console.log(href);
	});
	initializePopover(id);
	// $(window).resize(function()
	// {
	//     if ($(".popover").is(":visible"))
	//     {
	//     	console.log("popover");
	//         var popover = $(".popover");
	//         $("input:focus").popover('show');
	//     }
	// });
})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initializePopover(auth){
	var popoverTemplate = [ '<div class="popover">',
        					'<div class="arrow"></div>',
        					'<div class="popover-content"></div>',
        					'</div>'].join('');

    var content = [ '<div style="margin:5px;"> <a href="/profile?auth='+auth+'" class="btn btn-default">My Profile</a> </div>',
    				'<div style="margin:5px;"> <a href="/favorites?auth='+auth+'" class="btn btn-default">Favorites&nbsp</a> </div>',
        			'<div style="margin:5px;"><a href="/" class="btn btn-default" >&nbsp&nbspLogout&nbsp&nbsp&nbsp</a></div>'
        			].join('');


    $('[data-toggle="popover"]').popover({
        content: content,
        template: popoverTemplate,
        placement: "bottom",
        html: true
	}); 

	$('body').on('click', function (e) {
	    if ($(e.target).parent(".login-focus").data('toggle') !== 'popover'
	        && $(e.target).parents('.popover.in').length === 0) { 
	        $('[data-toggle="popover"]').popover('hide');
	    }
	});
}