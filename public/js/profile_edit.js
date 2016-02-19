'use strict';

var addedInterests = [];

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
	$('.interests').each(function(){
		var id = $(this).attr("id");
		addedInterests.push('#'+id);
		$('#'+id).click(deleteInterests);
	});
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

function addInterestsHelper(){
	console.log("addInterestsHelper");

	var checkboxes = $("input[type='checkbox']");
	console.log(checkboxes.length);
	for (var i=0; i<checkboxes.length; i++)  {
			if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked ) {
				var checkName = checkboxes[i].value;
				var del_counter = "#delete-button" + checkboxes[i].id;
				if(addedInterests.indexOf(del_counter) == -1 ){
					$('#profile-interests').append('<li>'+ checkName + '<input type="submit" id="delete-button' + checkboxes[i].id + '" class="interests" value="Delete">' +'</li>');
					console.log(del_counter);
					addedInterests.push(del_counter);
					$(del_counter).click(deleteInterests);
				}
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
	var id = '#'+$(this).attr('id');
	var index = addedInterests.indexOf(id);
	if (index > -1) {
	    addedInterests.splice(index, 1);
	}
	$(this).closest('li').remove();
}