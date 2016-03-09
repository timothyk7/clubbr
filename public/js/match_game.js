'use strict';

var currentClub;
var startTime;
var clubCounter = 0;

//fake recomendations
var recId = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var clubs = {"id": -1};
var user = {};

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	startTime = new Date();
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// console.log("Javascript connected!");
	clubCounter = 0;
    recId = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

	getClubs();

	// add listeners to the buttons
	$("#no-btn").click(noClick);
	$("#yes-btn").click(yesClick);
	$("#yes-modal-back-to-matching-btn").click(noClick);
	$("#show-events-btn").click(showEventList);
	$("#yes-modal-go-to-favorites-btn").click(goToFavorites);
	$("#no-more-modal-go-to-profile-btn").click(goToProfile);
	$("#start-again-btn").click(goToMatchMe);
}

/*
 * called to get the info for the next club 
 */
function getClubs() {
	// get data for initial club
	var id = getParameterByName('auth');
	user = {'userid': id};
	$.post("/match_me/get-club", user, function(result) {

		clubs = result['clubs'];
		user = result['user'];

		// console.log(clubs);
		// console.log(user);

		displayNextClub();
	});
}

function displayNextClub(){
	var result = getNextClub();
	currentClub = result['club'];

	// check if currentClub returned as empty object
	if(currentClub['id'] == -1) {
		$("#no-more-modal").modal({
			backdrop: 'static',
			keyboard: false
		});
		//$.post("/match_me/no-more", function() {});
	}

	// basic fix for the undefined error?
	if(currentClub['id'] != -1) {
		// fill in the title, description, and image using the json data
		if(result["recommend"] != ""){
			// console.log("enter");
			$("#rec-interest").css({'display': 'block'});
			$("#rec-interest").text("Based on interest: " + result["recommend"]);
		}else{
			$("#rec-interest").css({'display': 'none'});
		}
		$("#club-title").text(currentClub['name']);
	 	$("#club-description").text(currentClub['description']);
		$("#club-img").attr('src', currentClub['imageURL']);
		$("#learn-more").text(currentClub['learn-more']);
		$("#contact-info").text("Contact Email: "+currentClub['contact']);
		$("#yes-btn").removeClass("disabled");
		$("#yes-btn").find("span").attr("class", "glyphicon glyphicon-star-empty");
		startTime = new Date();
	}
}

function getNextClub() {
    var alreadyInFavorites = false;
    var rec = recommend(user);
    // console.log(rec);
    do {
        for(var i=0; i < user.favorites.length && clubCounter < clubs.length; i++) {
            alreadyInFavorites = false;
            if (user.favorites[i]['id'] == clubs[rec['index']]['id'] ) {
                alreadyInFavorites = true;
                rec = recommend(user);
                clubCounter++;
                break;
            }

        }
        // console.log(clubCounter);
    } while (alreadyInFavorites && clubCounter < clubs.length);


    var data = {'club': {"id": -1},
                'recommend': "" }
    if(clubCounter < clubs.length) {
        // club = clubs[clubCounter];
        // console.log(rec);
        data['club'] = clubs[rec["index"]];
        data['recommend'] = rec["interest"];
    }
    
    clubCounter++;

    return data;
}

/*
 0 - composting
 1 - cycling
 2 - reusable tote bag
 3 - bees
 4 - knitting
 5 - music
 6 - tennis
 7 - cooking
 8 - agriculture x
 9 - bike x
 10 - crochet x
 11 - animal appreciation x
 12 - ping pong x
 13 - taste of heaven x
 14 - theatre x
 15 - tubbs x
*/
function recommend(user){
    var data = {"index": -1,
                "interest": "" };
    for(var i =0; i<user.interests.length; i++){
        // If the user chooses honey gathering...
        if(user.interests[i]["remove_space"] == "Honey_Gathering" && recId.indexOf(3) != -1){
            data["index"] = recId.splice(recId.indexOf(3),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Honey_Gathering" && recId.indexOf(8) != -1){
            data["index"] = recId.splice(recId.indexOf(8),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses composting...
        else if(user.interests[i]["remove_space"] == "Composting" && recId.indexOf(0) != -1){
            data["index"] = recId.splice(recId.indexOf(0),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Composting" && recId.indexOf(8) != -1){
            data["index"] = recId.splice(recId.indexOf(8),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses gardening
        else if(user.interests[i]["remove_space"] == "Gardening" && recId.indexOf(0) != -1){
            data["index"] = recId.splice(recId.indexOf(0),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Gardening" && recId.indexOf(8) != -1){
            data["index"] = recId.splice(recId.indexOf(8),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses cycling
        else if(user.interests[i]["remove_space"] == "Cycling" && recId.indexOf(1) != -1){
            data["index"] = recId.splice(recId.indexOf(1),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Cycling" && recId.indexOf(9) != -1){
            data["index"] = recId.splice(recId.indexOf(9),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses Sewing
        else if(user.interests[i]["remove_space"] == "Sewing" && recId.indexOf(4) != -1){
            data["index"] = recId.splice(recId.indexOf(4),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Sewing" && recId.indexOf(10) != -1){
            data["index"] = recId.splice(recId.indexOf(10),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses Knitting
        else if(user.interests[i]["remove_space"] == "Knitting" && recId.indexOf(4) != -1){
            data["index"] = recId.splice(recId.indexOf(4),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Knitting" && recId.indexOf(10) != -1){
            data["index"] = recId.splice(recId.indexOf(10),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses Pets
        else if(user.interests[i]["remove_space"] == "Pets" && recId.indexOf(15) != -1){
            data["index"] = recId.splice(recId.indexOf(15),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Pets" && recId.indexOf(11) != -1){
            data["index"] = recId.splice(recId.indexOf(11),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } // if the user chooses Dancing
        else if(user.interests[i]["remove_space"] == "Dancing" && recId.indexOf(5) != -1){
            data["index"] = recId.splice(recId.indexOf(5),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Dancing" && recId.indexOf(14) != -1){
            data["index"] = recId.splice(recId.indexOf(14),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }// if the user chooses Cooking
        else if(user.interests[i]["remove_space"] == "Cooking" && recId.indexOf(7) != -1){
            data["index"] = recId.splice(recId.indexOf(7),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Cooking" && recId.indexOf(13) != -1){
            data["index"] = recId.splice(recId.indexOf(13),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } //if the user chooses Tennis
        else if(user.interests[i]["remove_space"] == "Tennis" && recId.indexOf(6) != -1){
            data["index"] = recId.splice(recId.indexOf(6),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Tennis" && recId.indexOf(12) != -1){
            data["index"] = recId.splice(recId.indexOf(12),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        } //if the user chooses Music
        else if(user.interests[i]["remove_space"] == "Music" && recId.indexOf(5) != -1){
            data["index"] = recId.splice(recId.indexOf(5),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }else if(user.interests[i]["remove_space"] == "Music" && recId.indexOf(14) != -1){
            data["index"] = recId.splice(recId.indexOf(14),1);
            data["interest"] = user.interests[i]["interest"];
            return data;
        }
    }
    data["index"] = recId.splice(0,1);
    return data;
}

/*
 * Listener for when you click the no button
 */
function noClick(e) {
    // console.log("No clicked");
    e.preventDefault();	
    displayNextClub();
    $(document).scrollTop(0);
}


/*
 * Makes a modal popup when yes is clicked
 */
function yesClick(e) {
	var clickTime = new Date();

    // console.log("Yes clicked");

    // determine which display we are using
    var display = "text"
   	if( $(this).text().trim() == "yes" ) {
   		display = "text";
   	}
   	else {
   		display = "icon";
   	}

   	var elapsed = clickTime - startTime;
   	// send click data to google analytics
   	ga('send', 'event', 'favorite', 'click', display+' (matchme)', elapsed);

   	// turn empty star to filled star, disable button
    $(this).find("span").attr("class", "glyphicon glyphicon-star");
    $(this).addClass('disabled');

 	// send club data and user id to save it into user's favorites
	var id = getParameterByName('auth');
	console.log(currentClub);
	var json = {'userid': id, 'currentClub': currentClub};

	$.post('/addToFavorites', json, function() {
		var club_title = currentClub['name'];

		// fill in the title and body of the popup modal
		$('#yes-modal-label').text('Added ' + club_title + ' to your favorites');
		// display the modal
		$('#yes-modal').modal();
	});

}


/*
 *
 */
function showEventList(e) {
	// Prevent following the link
	e.preventDefault();

	// hide the currently showing yes-modal
	$('#yes-modal').modal('hide');

	// fill in the title of the modal
	$('#upcoming-events-modal-label').text('Upcoming events for ' + currentClub['name']);

	var events = currentClub['events'];
	var eventHtml = "";
	var i;

	// loop through the club's events and create html
	for (i=0; i < events.length; i++) {
		eventHtml += "<h4>" + events[i]['title'] + "</h4>" +
					 "<p>" + events[i]['time'] + "</br>" +
					 "Location: " + events[i]['location'] + "</br>" +
					 "Description: " + events[i]['description'] + "</p>" +
					 "<p><br></p>";

	}

	// insert the html in the modal body
	$('#upcoming-events-modal-body').html(eventHtml);

	// show the modal
	$('#upcoming-events-modal').modal();

}

function goToProfile(e) {
	var id = getParameterByName('auth');
	window.location.href = '/profile'+'?auth='+id;
}

function goToFavorites(e) {
	var id = getParameterByName('auth');
	window.location.href = '/favorites'+'?auth='+id;
}

function goToMatchMe(e) {
	var id = getParameterByName('auth');
	window.location.href = '/match_me'+'?auth='+id;
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