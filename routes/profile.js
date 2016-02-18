var interest_data = require('../interests.json');

exports.view = function(req, res){
	res.render('profile', interest_data);
}