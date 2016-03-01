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
	$("#saveInterests").click(addInterestsHelper);
	$("#saveChanges").click(saveChanges);
	toggleInterest();
}

function toggleInterest() {
	var checkboxes = $("input[type='checkbox']");

	checkboxes.click(function() {
		$(this).closest('.checkbox-inline, .checkbox').toggleClass('checked');
	});
}

function editInterestsClick(e) {
    console.log("Edit Interests clicked");
	var elem = document.getElementById('profile-interests');
	elem.parentNode.removeChild(elem);
}

function addInterestsClick(e) {
	console.log("Add Interests clicked");

	var child = $('#interest').children();
	child.each(function(){
		$(this).css("display", "inherit");
	});

	//don't show interest added already
	for (var i=0; i<addedInterests.length; i++)  {
		var index = "#delete-button".length; //all interest inside will have delete button as part of id
		$('#'+addedInterests[i].substring(index)).parent().parent().css("display", "none");
	}

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
					var listItem = '<li style="margin: 5px;">'+ '<span class="pinterest">' + checkName + '</span>' +
					'<button id="delete-button'+checkboxes[i].id+
					'" class="btn btn-xs interests" style="margin-left: 10px;">Delete</button></li>';
					$('#profile-interests').append(listItem);
					console.log(del_counter);
					addedInterests.push(del_counter);
					$(del_counter).click(deleteInterests);
				}
		}
	}

	for (var i=0; i<checkboxes.length; i++)  {
		if (checkboxes[i].type == 'checkbox')   {
			checkboxes[i].checked = false;
			$('#'+checkboxes[i].id).parent().toggleClass('checked', false);
			
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
		$('#pname').text(example);
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
		$('#pemail').text(example);
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

function saveChanges(e) {
	var id = getParameterByName('auth');
	var name = $('#pname').text();
	var email = $('#pemail').text();
	var interests = [];

	$('.pinterest').each(function( index ) {
		var id = '#'+$(this).next().attr('id');
		var indexid = id.indexOf("--");
	  	var index = id.substring(indexid+2);

		var result = {}
  		result["id"] = index;
  		result["interest"] = $(this).text();
  		result["remove_space"] = $(this).text().split(' ').join('_');
  		interests.push(result);

	});

	var json = {
		'userid': id,
		'name': name,
		'email': email,
		'interests': JSON.stringify(interests)
	};

	console.log(json);
	$.post('/profile/save-changes', json, function() {
		window.location.href = '/profile'+'?auth='+id; // reload the page
	});
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