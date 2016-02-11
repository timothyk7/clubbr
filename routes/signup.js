var interest_data = require('../interests.json');

exports.view = function(req, res){
	res.render('signup', interest_data);
}