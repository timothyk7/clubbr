var clubs = require('../clubs.json');

exports.view = function(req, res){
	//var clubID = req.params.id;
	var clubID = 0;
  	var clubInfo = clubs['clubs'][clubID]; // of by one, our first project has index 0
  	console.log(clubInfo);
	res.render('clubprofile', clubInfo);
}


