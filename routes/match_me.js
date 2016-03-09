// Get all of our friend data
var club_data = require('../clubs.json');
var models = require('../models');


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
	res.render('match_me', club_data);
}



exports.clubInfo = function(req, res) {

    var data = {'clubs': {},
                'user': {} };

    var userid = req.body['userid'];

    models.User.findOne({"_id": userid}).exec(getClubs);

    function getClubs(err, user) {
        if(err){
            res.json(data);
            return;
        }
        data["clubs"] = club_data['clubs'];
        data["user"] = user;
        res.json(data);
    }

}
