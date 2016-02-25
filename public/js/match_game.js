'use strict';

var currentClub;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	displayNextClub();

	// add listeners to the buttons
	$("#no-btn").click(noClick);
	$("#yes-btn").click(yesClick);
	$("#yes-modal-back-to-matching-btn").click(noClick);
	$("#show-events-btn").click(showEventList);
	$("#yes-modal-go-to-favorites-btn").click(goToFavorites);
	$("#no-more-modal-go-to-profile-btn").click(goToProfile);
	$("#start-again-btn").click(goToMatchMe);
}

/*
 * called to get the info for the next club 
 */
function displayNextClub() {
	// get data for initial club
	var id = getParameterByName('auth');
	var user = {'userid': id};
	$.post("/match_me/get-next-club", user, function(result) {
		currentClub = result;

		// check if currentClub returned as empty object
		if(currentClub['id'] == -1) {
			$("#no-more-modal").modal();
			//$.post("/match_me/no-more", function() {});
		}

		// fill in the title, description, and image using the json data
		$("#club-title").text(currentClub['name']);
	 	$("#club-description").text(currentClub['description']);
		$("#club-img").attr('src', currentClub['imageURL']);
		$("#learn-more").text(currentClub['learn-more']);
	});
}

/*
 * Listener for when you click the no button
 */
 // commento
function noClick(e) {
    console.log("No clicked");
    e.preventDefault();	

    displayNextClub();

    // reached end of clubs list
    // if(clubCounter >= 6) {
    // 	$("#no-more-modal").modal();
    // 	clubCounter = -1;
    // }
}


/*
 * Makes a modal popup when yes is clicked
 */
function yesClick(e) {
    console.log("Yes clicked");

    $(this).addClass('disabled');
    // e.preventDefault();	
	var id = getParameterByName('auth');

	var json = {'userid': id, 'currentClub': currentClub};

	$.post('/addToFavorites', json, function() {
		var club_title = currentClub['name'];

		// fill in the title and body of the popup modal
		$('#yes-modal-label').text('Added ' + club_title + ' to your favorites');
		// display the modal
		$('#yes-modal').modal();
	});

}


/*
 *
 */
function showEventList(e) {
	// Prevent following the link
	e.preventDefault();

	// hide the currently showing yes-modal
	$('#yes-modal').modal('hide');

	// fill in the title of the modal
	$('#upcoming-events-modal-label').text('Upcoming events for ' + currentClub['name']);

	var events = currentClub['events'];
	var eventHtml = "";
	var i;

	// loop through the club's events and create html
	for (i=0; i < events.length; i++) {
		eventHtml += "<h4>" + events[i]['title'] + "</h4>" +
					 "<p>" + events[i]['time'] + "</br>" +
					 "Location: " + events[i]['location'] + "</br>" +
					 "Description: " + events[i]['description'] + "</p>" +
					 "<p><br></p>";

	}

	// insert the html in the modal body
	$('#upcoming-events-modal-body').html(eventHtml);

	// show the modal
	$('#upcoming-events-modal').modal();

}

function goToProfile(e) {
	var id = getParameterByName('auth');
	window.location.href = '/profile'+'?auth='+id;
}

function goToFavorites(e) {
	var id = getParameterByName('auth');
	window.location.href = '/favorites'+'?auth='+id;
}

function goToMatchMe(e) {
	var id = getParameterByName('auth');
	window.location.href = '/match_me'+'?auth='+id;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}