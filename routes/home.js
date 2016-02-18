var models = require('../models');

exports.view = function(req, res){
	var user = req.query;
	console.log(user);
    models.User
        .find({
            "_id": user["id"],
        })
        .exec(exists);

    function exists(err, users) {
        if (err) {
            console.log(err);
        }

    };

	res.render('home');
}