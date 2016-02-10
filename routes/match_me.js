// Get all of our friend data
var club_data = require('../clubs.json');
var counter = 0;

exports.view = function(req, res){
	res.render('match_me', club_data);
}
