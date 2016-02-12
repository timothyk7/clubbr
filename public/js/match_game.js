'use strict';

var clubCounter = 0;
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

	// get data for initial club
	$.get( "/"+clubCounter, function(result) {
		currentClub = result;
	});


	// add listeners to the buttons
	$("#no-btn").click(noClick);
	$("#yes-btn").click(yesClick);
	$("#learn-more-btn").click(learnMoreClick);
	$("#yes-modal-back-to-matching-btn").click(noClick);
	$("#upcoming-events-back-to-matching-btn").click(noClick);
	$("#show-me-btn").click(showEventList);
	$("#go-to-profile-btn").click(goToProfile);
	$("#start-again-btn").click(noClick);
}

/*
 * Listener for when you click the no button
 */
 // commento
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
    	$("#learn-more").text("");

		$("div.learn-more").show();
    	
    	// get data for initial club
		$.get( "/match_me/"+clubCounter, function(result) {
			currentClub = result;			

			// fill in the title, description, and image using the json data
			$("#club-title").text(currentClub['name']);
		 	$("#club-description").text(currentClub['description']);
			$("#club-img").attr('src', currentClub['imageURL']);

		});
    }
}


/*
 * Makes a modal popup when yes is clicked
 */
function yesClick(e) {
    console.log("Yes clicked");
    e.preventDefault();	

    // get the current club's title
    var club_title = currentClub['name'];

    // fill in the title and body of the popup modal
    $('#yes-modal-label').text('Added ' + club_title + ' to your interests!');
    $('#yes-modal-body').text('Would you like to see the upcoming events for ' + club_title + '?');

    // display the modal
	$('#yes-modal').modal();
	
}

function learnMoreClick(e) {
	var learnMoreInfo = currentClub['learn-more'];

	$("#learn-more").text(learnMoreInfo);

	$("div.learn-more").hide();
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
	//$.get("/"+clubCounter, getEventList);	

	// fill in the title of the modal
	$('#upcoming-events-modal-label').text('Upcoming events for ' + currentClub['name']);

	var events = currentClub['events'];
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

	// show the modal
	$('#upcoming-events-modal').modal();

}

function goToProfile(e) {
	window.location.href = '/profile';
}