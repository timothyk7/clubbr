var Mongoose = require('mongoose');

//recursively add new schema
var InterestSchema = new Mongoose.Schema();
InterestSchema.add({
	"id": Number,
    "interest": String,
    "remove_space": String
});

var EventSchema = new Mongoose.Schema(); 
EventSchema.add({
	"title": String,
	"time": String,
	"location": String,
	"description": String

});

var ClubSchema = new Mongoose.Schema();
ClubSchema.add({
	"id": Number, 
	"clubID": String,
	"name": String,
	"description": String,
	"imageURL": String,
	"learn-more": String,
	"events": [EventSchema]
});

var UserSchema = new Mongoose.Schema({
	"name": String,
    "email": String,
    "password": String,
    "displayIcon": Boolean,
    "interests": [InterestSchema],
    "favorites": []
});

exports.User = Mongoose.model('User', UserSchema);
exports.Interest = Mongoose.model('Interests', InterestSchema);
exports.Club = Mongoose.model('Clubs', ClubSchema);
exports.Event = Mongoose.model('Events', EventSchema);
//help: http://stackoverflow.com/questions/30856208/invalid-value-for-schema-array-path