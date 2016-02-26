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

	var clubid = getParameterByName('id');

	// get data for initial club
	$.get( "/clubprofile/"+clubid, function(result) {
		currentClub = result;
	});

	// add listeners to the buttons
	$("#add-to-favorites-btn").click(addClick);
	$("#show-events-btn").click(showEventList);
	$("#yes-modal-go-to-favorites-btn").click(goToFavorites);
}

/*
 * Makes a modal popup when yes is clicked
 */
function addClick(e) {
    console.log("Add to favorites clicked");
    // e.preventDefault();	
	var id = getParameterByName('auth');

	var json = {'userid': id, 'currentClub': currentClub};

	$.post('/addToFavorites', json, function() {

		var club_title = currentClub['name'];

		// fill in the title and body of the popup modal
		$('#yes-modal-label').text('Added ' + club_title + ' to your favorites');
		// display the modal
		$('#yes-modal').modal();

		$('#add-to-favorites-btn').addClass('disabled');
		$('#add-to-favorites-btn').html("<span class='glyphicon glyphicon-heart'></span>");
		

	});
}

function showEventList(e) {
	// Prevent following the link
	e.preventDefault();

	// get the current club json info and display in modal
	//$.get("/"+clubCounter, getEventList);	

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

function goToFavorites(e) {
	var id = getParameterByName('auth');
	window.location.href = '/favorites'+'?auth='+id;
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