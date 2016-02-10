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

	window.location.href = '/home';

}

function authenticate(result){
	console.log(result);
}