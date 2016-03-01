// Get all of our friend data
var club_data = require('../clubs.json');
var models = require('../models');
var clubCounter = 0;

//fake recomendations
var recId = [0,1,2,3,4,5,6,7,8];

exports.view = function(req, res){
    clubCounter = 0;
    recId = [0,1,2,3,4,5,6,7,8];
	authenticate(req, res)
}

function authenticate(req, res){
    models.User
        .find({
            "_id": req.query["auth"],
        })
        .exec(exists);

    function exists(err, users) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }else{
        	if(users.length !== 0){
        		createView(req, res, users[0]);
				return;
        	}
        	res.redirect('/');
        }
    };
}

//change as needed
function createView(req, res, userData){
	var userData = userData || {};
	res.render('match_me', club_data);
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
 8 - tubbs
*/
function recommend(user){
    for(var i =0; i<user.interests.length; i++){
        if(user.interests[i]["remove_space"] == "Honey_Gathering" && recId.indexOf(3) != -1){
            return recId.splice(recId.indexOf(3),1);
        }else if(user.interests[i]["remove_space"] == "Composting" && recId.indexOf(0) != -1){
            return recId.splice(recId.indexOf(0),1);
        }else if(user.interests[i]["remove_space"] == "Gardening" && recId.indexOf(0) != -1){
            return recId.splice(recId.indexOf(0),1);
        }else if(user.interests[i]["remove_space"] == "Cycling" && recId.indexOf(1) != -1){
            return recId.splice(recId.indexOf(1),1);
        }else if(user.interests[i]["remove_space"] == "Sewing" && recId.indexOf(4) != -1){
            return recId.splice(recId.indexOf(4),1);
        }else if(user.interests[i]["remove_space"] == "Knitting" && recId.indexOf(4) != -1){
            return recId.splice(recId.indexOf(4),1);
        }else if(user.interests[i]["remove_space"] == "Pets" && recId.indexOf(8) != -1){
            return recId.splice(recId.indexOf(8),1);
        }else if(user.interests[i]["remove_space"] == "Dancing" && recId.indexOf(5) != -1){
            return recId.splice(recId.indexOf(5),1);
        }else if(user.interests[i]["remove_space"] == "Cooking" && recId.indexOf(7) != -1){
            return recId.splice(recId.indexOf(7),1);
        }else if(user.interests[i]["remove_space"] == "Tennis" && recId.indexOf(6) != -1){
            return recId.splice(recId.indexOf(6),1);
        }else if(user.interests[i]["remove_space"] == "Music" && recId.indexOf(5) != -1){
            return recId.splice(recId.indexOf(5),1);
        }
    }
    return recId.splice(0,1);
}

exports.clubInfo = function(req, res) {

    var userid = req.body['userid'];

    models.User.findOne({"_id": userid}).exec(getNextClub);

    function getNextClub(err, user) {
        clubs = club_data['clubs'];

        var alreadyInFavorites = false;
        var rec = recommend(user);
        do {
            for(var i=0; i < user.favorites.length && clubCounter < clubs.length; i++) {
                alreadyInFavorites = false;
                if (user.favorites[i]['id'] == clubs[rec]['id'] ) {
                    alreadyInFavorites = true;
                    rec = recommend(user);
                    clubCounter++;
                    break;
                }

            }
            console.log(clubCounter);
        } while (alreadyInFavorites && clubCounter < clubs.length);


        var club = {'id': -1}
        if(clubCounter < clubs.length) {
            // club = clubs[clubCounter];
            club = clubs[rec];
        }


        // console.log('club: ' + JSON.stringify(club));
        res.json(club);
        clubCounter++;
    }



    // var alreadyInFavorites = false;

    //     for(var i=0; i < user.favorites.length; i++) {
    //       if (JSON.stringify(user.favorites[i]) === JSON.stringify(favoriteClub) ) {
    //         alreadyInFavorites = true;
    //         break;
    //       }
    //     }


    // if(clubCounter < club_data['clubs'].length) {
    //     club = club_data['clubs'][clubCounter];
    //     console.log(club);
    //     while(clubCounter < club_data['clubs'].length && club['added']) {
    //         clubCounter++;
    //         club = club_data['clubs'][clubCounter];
    //     }
    // }


    // res.json(club);
    // clubCounter++;

}

// exports.noMore = function(req, res) {
//     clubCounter = 0;
// }
