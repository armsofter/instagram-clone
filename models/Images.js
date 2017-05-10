var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imagesSchema = new Schema({
    image:String,
    userId:String,
    createTime:Date,
    likes:[],
    comments: [{
        comment:String,
        userId: String,
        createDate:Date
    }]
});

module.exports = mongoose.model('images', imagesSchema);
