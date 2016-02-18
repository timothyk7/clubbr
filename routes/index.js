var models = require('../models');

exports.view = function(req, res){
	res.render('index');
}

exports.authenticate = function(req, res){
	var user = req.query;
    models.User
        .find({
            "email": user["email"],
            "password": user["password"]
        })
        .exec(exists);

    function exists(err, users) {
        var result = {};
        if (users.length == 0) {
            result["verified"] = false;
            result["id"] = -1;
        } else {
            result["verified"] = true;
            result["id"] = users[0]["id"];
        }

        if (err) {
            console.log(err);
        }

        console.log(result);
        
        res.json(result);
    };
}