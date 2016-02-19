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
	res.render('favorites', userData);
}


exports.addFavorite = function(req, res) {
	favoriteClub = req.body;
	console.log('favoriteClub0');
	console.log(favoriteClub);

	var favorite = new models.Club(favoriteClub);

	var user = models.User.findOne({'name': 'Wendy Tang'}).exec(saveToFavorites);

	function saveToFavorites(err, user) {
		console.log('user:');
		console.log(user);
		console.log('favoriteClub');
		console.log(favoriteClub);
	}

	res.send();
	// user.save(function (err) {
	// 	if (err) return handleError(err);
	// 	console.log('Added To Favorites!');
	// });
};
