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
	var clubID = req.query.id;
	// var clubID = 0;
  	var clubInfo = clubs['clubs'][clubID]; // of by one, our first project has index 0
	res.render('clubprofile', clubInfo);
}

exports.clubInfo = function(req, res) {
    club = clubs['clubs'][req.params.id];
    res.json(club);
}


