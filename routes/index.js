var models = require('../models');
var clubInfo = require('../clubs')

exports.view = function(req, res){
    clubInfo['displayIcon'] = false;
	res.render('index');
}

exports.viewIcon = function(req, res){
    clubInfo['displayIcon'] = true;
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
        
        res.json(result);
    };
}