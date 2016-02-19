var models = require('../models');
var favoriteClub

exports.view = function(req, res){
	var user = models.User.findOne({'name': 'Wendy Tang'})
				.exec(renderFavorites);

	function renderFavorites(err, user) {
		res.render('favorites', {'favorites': user.favorites});
	}
};

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