'use strict';

var clubCounter = 1;

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

    var idNumber = clubCounter % 6;
    clubCounter++;
    $.get("/"+idNumber, getNextClub);	
}

function getNextClub(result) {
	console.log(result)

	$("#club-title").text(result['name']);
 	$("#club-description").text(result['description']);
	$("#club-img").attr('src', result['imageURL']);
}

function yesClick(e) {
    console.log("Yes clicked");
    e.preventDefault();	

	$("#club-description").text("Added to interests!");
	
}