
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePopover();
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

function initializePopover(){
	var popoverTemplate = [ '<div class="popover">',
        					'<div class="arrow"></div>',
        					'<div class="popover-content"></div>',
        					'</div>'].join('');

    var content = [ '<div style="margin:5px;"> <a href="/profile" class="btn btn-default">My Profile</a> </div>',
    				'<div style="margin:5px;"> <a href="/favorites" class="btn btn-default">Favorites&nbsp</a> </div>',
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