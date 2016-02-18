var models = require('../models');

exports.view = function(req, res){
	var user = models.User.findOne({'name': 'Wendy Tang'})
				.exec(renderFavorites);

	function renderFavorites(err, favorites) {
		res.render('favorites', {'favorites': user.favorites});
	}
};
