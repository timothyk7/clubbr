var models = require('../models');
var interest_data =require('../interests.json')

exports.view = function(req, res){
	res.render('signup', interest_data);
}

exports.signup = function(req, res) {
	//Adding stuff to query
    var toAdd = req.body;

    //checking if user is part of the DB or not
    var result = {
        "added": false,
        "id": -1
    };

    //assign user to either word button layout or icon button layout
    var random = Math.random();
    console.log(random);
    var displayIcon = false;

    if (random >= 0.5) {
        displayIcon = false;
    } else {
        displayIcon = true;
    }

    //console.log(toAdd.interests);
    var existed = false;
    var newUser = new models.User({
            "name": toAdd.name,
            "email": toAdd.email,
            "password": toAdd.password,
            "displayIcon": displayIcon,
            "interests": JSON.parse(toAdd.interests)			
    });

    newUser.save(afterSaving);

 	function afterSaving(err) {
   		if(err) console.log(err);
   		res.send("Saved!");
   		console.log("it is done");
  	}

    
};

