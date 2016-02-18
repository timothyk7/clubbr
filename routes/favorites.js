var clubs = require('../clubs.json');

exports.view = function(req, res){
	res.render('favorites', clubs);
}
