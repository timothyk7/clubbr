// Get all of our friend data
var club_data = require('../clubs.json');
var models = require('../models');
var clubCounter = 0;

exports.view = function(req, res){
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
    clubCounter = 0;
	res.render('match_me', club_data);
}

exports.clubInfo = function(req, res) {

    var club = {}
    if(clubCounter < club_data['clubs'].length) {
        club = club_data['clubs'][clubCounter];
    }
    while(club['added']) {
        clubCounter++;
        club = club_data['clubs'][clubCounter];
    }

    res.json(club);
    clubCounter++;

}

// exports.noMore = function(req, res) {
//     clubCounter = 0;
// }
