// Get all of our friend data
var club_data = require('../clubs.json');
var models = require('../models');
var clubCounter = 0;

//fake recomendations
var recId = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

exports.view = function(req, res){
    console.log("hi");
    clubCounter = 0;
    recId = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
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

exports.clubInfo = function(req, res) {

    var userid = req.body['userid'];

    models.User.findOne({"_id": userid}).exec(getNextClub);

    function getNextClub(err, user) {
        clubs = club_data['clubs'];

        var alreadyInFavorites = false;
        var rec = recommend(user);
        console.log(rec);
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


        // console.log('club: ' + JSON.stringify(club));
        res.json(data);
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
