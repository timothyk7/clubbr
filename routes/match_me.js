// Get all of our friend data
var club_data = require('../clubs.json');

exports.view = function(req, res){
	res.render('match_me', club_data);
}
