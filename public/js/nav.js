
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializeNavBar();
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



function initializeNavBar(){
	var navbar ='<div class="navbar-header col-xs-12">'+
				'<a class="navbar-brand" href="/home" style="margin-top:10px;">Clubbr</a>'+
				'<div class="navbar-right pull-right" style="margin-right:10px;">'+
				'<p class="navbar-text">'+
				'Signed in as <a href="/profile" class="navbar-link">Wendy Tang&nbsp&nbsp</a>'+
				'<a tabindex="0" class="navbar-link login-focus" role="button" data-toggle="popover" data-placement="bottom">'+
				'<img src="images/wendy.jpeg" class="profile-thumbnail"></img>'+
				'</a></p></div></div> ';
	$(".navbar").append(navbar);
}

function initializePopover(){
	var popoverTemplate = [ '<div class="popover">',
        					'<div class="arrow"></div>',
        					'<div class="popover-content"></div>',
        					'</div>'].join('');

    var content = [ '<div style="margin:5px;"> <a href="/profile" class="btn btn-default">My Profile</a> </div>',
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