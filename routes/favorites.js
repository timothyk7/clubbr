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
	// res.render('favorites', clubs);
	var favorites = {'favorites': userData['favorites']};
	res.render('favorites', favorites);
}


exports.addFavorite = function(req, res) {
	var jsondata = req.body;

	var userid = jsondata['userid'];

	var favoriteClub = {
		"id": jsondata['currentClub[id]'], 
		"clubID": jsondata['currentClub[clubID]'], 
		"name": jsondata['currentClub[name]'],
	};

	models.User.findOne({"_id": userid}).exec(saveToFavorites);

	function saveToFavorites(err, user) {
		if (err) return handleError(err);

		var alreadyInFavorites = false;

		for(var i=0; i < user.favorites.length; i++) {
		  if ( user.favorites[i]['id'] == favoriteClub['id'] ) {
		  	alreadyInFavorites = true;
		  	break;
		  }
		}
		
		if(!alreadyInFavorites) {
			user.favorites.push(favoriteClub);
		}

		user.save(function(err){
			if (err) return handleError(err);
		}); 
		//console.log('user:');
		//console.log(user);
		res.send();
	}

	
};
