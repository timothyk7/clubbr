
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("initializePage");
	clearInputs();
	toggleInterest();
	addInterest();
    
}

function clearInputs(){
	var checkboxes = $("input[type='checkbox']");
	for (var i=0; i<checkboxes.length; i++)  {
  		if (checkboxes[i].type == 'checkbox')   {
   		 checkboxes[i].checked = false;
  		}
	}
	$('#interest').val("");
}

function toggleInterest() {
	var checkboxes = $("input[type='checkbox']"), submitButt = $("input[type='submit']");

	checkboxes.click(function() {
		// $(this).closest('.checkbox-inline, .checkbox').toggleClass('checked'); //add color change later
	    submitButt.attr("disabled", !checkboxes.is(":checked"));
	});
}

function addInterest() {
	//DOESNT HANDLE SPACES/ should camel case
	//duplicate ids
	var interest = "";
	var interestId = $('#interest');
	var interestCheckbox = $('.form-group #checkBoxInterests');

	$('#addInterest').click(function(event){
		event.preventDefault();
		if(interestId.val() != ""){
			interest = interestId.val();
			var newCheckbox = "<label class=\"checkbox-inline\" for=\"Checkboxes_"+interest+"\">" +
				  "<input type=\"checkbox\" name=\"Checkboxes\" id=\"Checkboxes_"+interest+
				  "\" value=\""+interest+"\">"+interest+"</label>";
			interestCheckbox.append(newCheckbox);
			toggleInterest();
		}else{
			//error msg
			alert('Please fill in a interest');
		}
	});
}


