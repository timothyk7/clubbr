var clubs = require('../clubs.json');

exports.view = function(req, res){
	res.render('orgs', clubs);
}

exports.clubInfo = function(req, res) {
	var clubID = req.params.id;
  	var club = clubs['clubs'][clubID]; // of by one, our first project has index 0
  	console.log(club);
  	res.json(club);

}