var Mongoose = require('mongoose');

//recursively add new schema
var InterestsSchema = new Mongoose.Schema();
InterestsSchema.add({
	"id": Number,
    "interest": String,
    "remove_space": String
});

var UserSchema = new Mongoose.Schema({
	"name": String,
    "email": String,
    "password": String,
    "interests": [InterestsSchema]
});

exports.User = Mongoose.model('User', UserSchema);
exports.Interests = Mongoose.model('Interests', InterestsSchema);

//help: http://stackoverflow.com/questions/30856208/invalid-value-for-schema-array-path