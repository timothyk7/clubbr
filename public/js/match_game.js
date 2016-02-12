'use strict';

var clubCounter = 0;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");


	// add listeners to the buttons
	$("#no-btn").click(noClick);
	$("#yes-btn").click(yesClick);
	$("#yes-modal-back-to-matching-btn").click(noClick);
	$("#upcoming-events-back-to-matching-btn").click(noClick);
	$("#show-me-btn").click(showEventList);
	$("#go-to-profile-btn").click(goToProfile);
	$("#start-again-btn").click(noClick);
}

/*
 * Listener for when you click the no button
 */
function noClick(e) {
    console.log("No clicked");
    e.preventDefault();	

    clubCounter++;

    // reached end of clubs list
    if(clubCounter >= 6) {
    	$("#no-more-modal").modal();
    	clubCounter = -1;
    }
    else {
    	// get the club with id of idNumber
    	$.get("/"+clubCounter, getNextClub);
    }
}


function getNextClub(result) {

	// fill in the title, description, and image using the json data
	$("#club-title").text(result['name']);
 	$("#club-description").text(result['description']);
	$("#club-img").attr('src', result['imageURL']);
}

/*
 * Makes a modal popup when yes is clicked
 */
function yesClick(e) {
    console.log("Yes clicked");
    e.preventDefault();	

    // get the current club's title
    var club_title = $("#club-title").text();

    // fill in the title and body of the popup modal
    $('#yes-modal-label').text('Added ' + club_title + ' to your interests!');
    $('#yes-modal-body').text('Would you like to see the upcoming events for ' + club_title + '?');

    // display the modal
	$('#yes-modal').modal();
	
}

/*
 *
 */
function showEventList(e) {
	// Prevent following the link
	e.preventDefault();

	// hide the currently showing yes-modal
	$('#yes-modal').modal('hide');

	// get the current club json info and display in modal
	$.get("/"+clubCounter, getEventList);	

	// show the modal
	$('#upcoming-events-modal').modal();

}

function getEventList(result) {
	// fill in the title of the modal
	$('#upcoming-events-modal-label').text('Upcoming events for ' + result['name']);

	var events = result['events'];
	var eventHtml = "";
	var i;

	// loop through the club's events and create html
	for (i=0; i < events.length; i++) {
		eventHtml += "<h4>" + events[i]['title'] + "</h4>" +
					 "<h5>" + events[i]['time'] + 
					 "<h5>" + events[i]['description'] +
					 "<p><br></p>";

	}

	// insert the html in the modal body
	$('#upcoming-events-modal-body').html(eventHtml);
}

function goToProfile(e) {
	window.location.href = '/profile';
}