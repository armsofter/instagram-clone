var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    avatar:String,
    followers:[],
    following:[],
    password: String,
    token: String,
    isPrivate:Boolean,
    firstName:String,
    lastName:String,
    description:String
});

module.exports = mongoose.model('users', usersSchema);
