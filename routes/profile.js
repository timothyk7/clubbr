var interest_data = require('../interests.json');
var models = require('../models');

exports.view = function(req, res){
	authenticate(req, res);
}

function authenticate(req, res){
    models.User
        .find({
            "_id": req.query["auth"],
        })
        .exec(exists);

    function exists(err, users) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }else{
        	if(users.length !== 0){
        		createView(req, res, users[0]);
				return;
        	}
        	res.redirect('/');
        }
    };
}

exports.saveChanges = function(req,res) {
    var userid = req.body['userid'];
    var name = req.body['name'];
    var email = req.body['email'];
    var interests = req.body['interests'];

    models.User.findOne({"_id": userid}).exec(saveUserChanges);

    function saveUserChanges(err, user) {
        if (err) return handleError(err);

        user.name = name;
        user.email = email;
        user.interests = JSON.parse(interests);


        user.save(function (err) {
            if (err) return handleError(err);
            res.send();
        });
    }
    
}

//change as needed
function createView(req, res, userData){
	var userData = userData || {};
	result = {};
	result['user'] = userData;
	result['interests'] = interest_data;
	res.render('profile', result);
}

