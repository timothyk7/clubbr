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
	$("#saveChanges").click(addInterestsHelper);
}


function editInterestsClick(e) {
    console.log("Edit Interests clicked");
	var elem = document.getElementById('profile-interests');
	elem.parentNode.removeChild(elem);
}

function addInterestsClick(e) {
	console.log("Add Interests clicked");
	$('#interests-modal').modal();
}

var counter = 0;
function addInterestsHelper(){
	console.log("addInterestsHelper");

	var checkboxes = $("input[type='checkbox']");
	console.log(checkboxes.length);
	for (var i=0; i<checkboxes.length; i++)  {
			if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked ) {
				var checkName = checkboxes[i].id;
				$('#profile-interests').append('<li>'+ checkName + '<input type="submit" id="delete-button' + counter + '"  value="Delete">' +'</li>');
				var del_counter = "#delete-button" + counter;
				console.log(del_counter);
				$(del_counter).click(deleteInterests);
				counter++
		}
	}



}

function editName(e) {
	console.log("editName");
 		// show the modal
	$('#name-modal').modal();
}

function editNameHelper(){
	console.log("editNameHelper");
	var example = $('#new-name').val();

	if(example){
		example.fonts
		$('#profile-name').text(example);
		$('#name-modal').modal("hide");
	} else {
		$('#name-modal').parents('p').addClass('warning')
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

	if($('#new-email').val()){
		$('#profile-email').text(example);
		$('#email-modal').modal("hide");
	} else {
		$('#email-modal').parents('p').addClass('warning')
	}

}


function deleteInterests(e){
	console.log("deleteInterests");
	$(this).closest('li').remove();
}