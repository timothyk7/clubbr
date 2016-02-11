
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	$('#submitBtn').on('click', function() {
		if(checkCompleted()){
			clearBorder();
			setTimeout(function(){
				window.location.href = '/home';
			}, 500);
			
		}
        else
        	alert('Incomplete profile, please fillout highlighted parts');
    });

})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("initializePage");
	clearInputs();
	toggleInterest();
}

function clearInputs(){
	var checkboxes = $("input[type='checkbox']");
	for (var i=0; i<checkboxes.length; i++)  {
  		if (checkboxes[i].type == 'checkbox')   {
   		 checkboxes[i].checked = false;
  		}
	}
	clearBorder();
	$("#name").val("");
	$("#email").val("");

}

function toggleInterest() {
	var checkboxes = $("input[type='checkbox']"), submitButt = $("#submitBtn");

	checkboxes.click(function() {
		$(this).closest('.checkbox-inline, .checkbox').toggleClass('checked');
	});
}

function clearBorder(){
	$("#name").css("border", "");
	$("#email").css("border", "");
	$("#password").css("border", "");
	$("#interest").css("border", "");

}

function checkCompleted(){
	var completed = true;
	clearBorder();
	if ($("#name").val() == ""){
		$("#name").css("border", "1px solid red");
		completed = false;
	}
	if ($("#email").val() == ""){
		$("#email").css("border", "1px solid red");
		completed = false;
	}
	if ($("#password").val() == ""){
		$("#password").css("border", "1px solid red");
		completed = false;
	}
	var checkboxes = $("input[type='checkbox']");
	var selected = false;
	for (var i=0; i<checkboxes.length; i++)  {
  		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked ) {
  			selected = true;
  		}
	}
	if(!selected){
		$("#interest").css("border", "1px solid red");
	}
	completed = completed & selected;
	return completed;
}
