$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#submitBtn').click(login);

}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function login(e) {
	// Prevent following the link
	e.preventDefault();
	if(checkCompleted()){
		clearBorder();
		setTimeout(function(){
			window.location.href = '/home';
		}, 500);	
	}else{
		alert("Please enter your email and password");
	}
}

function clearBorder(){
	$("#email").css("border", "");
	$("#password").css("border", "");

}

function checkCompleted(){
	var completed = true;
	clearBorder();
	if ($("#email").val() == ""){
		$("#email").css("border", "1px solid red");
		completed = false;
	}
	if ($("#password").val() == ""){
		$("#password").css("border", "1px solid red");
		completed = false;
	}
	return completed;
}

function authenticate(result){
	console.log(result);
}