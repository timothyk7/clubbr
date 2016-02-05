'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	$("#no-btn").click(noClick);
	$("#yes-btn").click(yesClick);
}

function noClick(e) {
    console.log("No clicked");
    e.preventDefault();	

    $("#club-title").text("Bicycling Club");
 	$("#club-description").text("We like bicycling, Bicycling is our passion");
	$("#club-img").attr('src', 'http://www.balloons.com.au/Images/LargeImages/peppa_pig_bike_lrg.JPG');
	
}

function yesClick(e) {
    console.log("Yes clicked");
    e.preventDefault();	

	$("#club-description").text("Added to interests!");
	
}