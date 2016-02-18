var Mongoose = require('mongoose');

//recursively add new schema
var InterestsSchema = new Mongoose.Schema();
InterestsSchema.add({
	"id": Number,
    "interest": String,
    "remove_space": String
});

var EventsSchema = new Mongoose.Schema(); 
EventsSchema.add({
	"title": String,
	"time": String,
	"location": String,
	"description": String

});

var ClubsSchema = new Mongoose.Schema();
ClubsSchema.add({
	"id": Number, 
	"clubID": String,
	"name": String,
	"description": String,
	"imageURL": String,
	"learn-more": String,
	"events": [EventsSchema]
});

var UserSchema = new Mongoose.Schema({
	"name": String,
    "email": String,
    "password": String,
    "interests": [InterestsSchema],
    "favorites": [ClubsSchema]
});

exports.User = Mongoose.model('User', UserSchema);
exports.Interests = Mongoose.model('Interests', InterestsSchema);
exports.Clubs = Mongoose.model('Clubs', ClubsSchema);
exports.Events = Mongoose.model('Events', EventsSchema);
//help: http://stackoverflow.com/questions/30856208/invalid-value-for-schema-array-path