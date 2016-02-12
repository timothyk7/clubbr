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
	$("#editInterest").click(editInterestsClick);
	$("#addInterest").click(addInterestsClick);
	$("#editName").click(editName);
	$("#editEmail").click(editEmail);
	$("#change-name").click(editNameHelper);
	$("#change-email").click(editEmailHelper);
}


function editInterestsClick(e) {
    console.log("Edit Interests clicked");
	var elem = document.getElementById('profile-interests');
	elem.parentNode.removeChild(elem);
}

function addInterestsClick(e) {
	console.log("Add Interests clicked");
	$("#profile-interests").append( $("<li>" + $("#inputbox").val() + "</li>") );
  	li.appendChild(document.createTextNode("Four"));
  	elem.appendChild(li);
}

function editName(e) {
	console.log("editName");
 		// show the modal
	$('#name-modal').modal();
}

function editNameHelper(){
	console.log("editNameHelper");
	var example = $('#new-name').val();

	if(example != null){
		example.fonts
		$('#profile-name').text(example);
		$('#name-modal').modal("hide");
	}
}

function editEmail(e) {
	console.log("editEmail");
 		// show the modal
	$('#email-modal').modal();
}

function editEmailHelper(){
	console.log("editEmailHelper");
	var example = $('#new-email').val();

	if(example != null){
		example.fonts
		$('#profile-email').text(example);
		$('#email-modal').modal("hide");
	}

}