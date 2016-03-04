
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	$('#submitBtn').on('click', function() {
		if(checkCompleted()){
			clearBorder();
			// setTimeout(function(){
			// 	window.location.href = '/home';
			// }, 500);
			var user = $('#name').val();
			var pass = $('#password').val();
			var email = $('#email').val();
			var interestArray = [];

			var checkboxes = $("input[type='checkbox']");
			var selected = false;
			for (var i=0; i<checkboxes.length; i++)  {
	  		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked ) {
	  			var result = {}
	  			//finds the remove space part
	  			var idTemp = checkboxes[i].id;
	  			var indexid = idTemp.indexOf("-");
	  			var idTemp = idTemp.substring(indexid+2);
	  			var idNum = parseInt(idTemp);
	  			result["id"] = idNum;
	  			result["interest"] = checkboxes[i].value;
	  			var idTemp = checkboxes[i].id;
	  			var indexid = idTemp.indexOf("-");
	  			var removeTemp = idTemp.substring(0,indexid);
	  			result["remove_space"] = removeTemp;
	  			interestArray.push(result);
	  		}
		}

			var json = {
				"name": user,
				"email": email,
				"password": pass,
				"interests": JSON.stringify(interestArray)
			};

			$.post("/signupsubmit", json,function() {
				console.log("json sent!");
				authenticate(json['email'], json['password']);
			});	
		}
        else
        	alert('Incomplete profile, please fillout highlighted parts');
    });
	$('#saveChanges').on('click', function(){
		var checkboxes = $("#checkBoxInterestsModal input[type='checkbox']");
		var selected = false;
		for (var i=0; i<checkboxes.length; i++)  {
	  		if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked ) {
	  			selected = true;
	  		}
		}
		// if(selected){
		// 	alert("Added to interest");
		// }
	});

	$('#seeMoreBtn').on('click', function() {
		var child = $('#interest').children();
		child.each(function(){
			$(this).css("display", "inherit");
		});
		$('#seeMoreBtn').hide(); 
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
	var checkboxes = $("input[type='checkbox']");

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

function authenticate(email, password) {
        $.post("/authenticate?email=" + email + "&password=" + password, function(result) {
            if (result["verified"]) {
                window.location.href = '/home?auth='+result['id'];
            } else {
                alert("Invalid username and/or password");
                return;
            }
        });
}