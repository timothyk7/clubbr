// Get all of our friend data
var club_data = require('../clubs.json');
var models = require('../models');
var clubCounter = 0;

exports.view = function(req, res){
    clubCounter = 0;
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

exports.clubInfo = function(req, res) {

    var userid = req.body['userid'];

    models.User.findOne({"_id": userid}).exec(getNextClub);

    function getNextClub(err, user) {
        clubs = club_data['clubs'];

        var alreadyInFavorites = false;

        do {
            for(var i=0; i < user.favorites.length && clubCounter < clubs.length; i++) {
                alreadyInFavorites = false;         
                if (user.favorites[i]['id'] == clubs[clubCounter]['id'] ) {
                    alreadyInFavorites = true;
                    clubCounter++;
                    break;
                }

            }
            console.log(clubCounter);
        } while (alreadyInFavorites && clubCounter < clubs.length);


        var club = {'id': -1}
        if(clubCounter < clubs.length) {
            club = clubs[clubCounter];
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
