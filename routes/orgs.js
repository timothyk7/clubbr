var clubs = require('../clubs.json');
var models = require('../models');

exports.view = function(req, res){
	authenticate(req, res);
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
	res.render('orgs', clubs);
}

exports.clubInfo = function(req, res) {
	var clubID = req.params.id;
  	var club = clubs['clubs'][clubID]; // of by one, our first project has index 0
  	console.log(club);
  	res.json(club);

}