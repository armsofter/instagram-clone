var Images = require('../models/Images');
var Users = require('../models/Users');
var sha256 = require('sha256');
var authHelper = require('../helpers/authHelper');
var validDataHelper = require('../helpers/validDataHelper');
var moment = require('moment');

exports.addImage = function (req, res) {
    authHelper.checkToken(req, function (err, data) {
        if (!err) {
            validDataHelper.validateReqData(req, 'body', [], function (err, errProps) {
                if (!err) {
                    var newImage = Images({
                        image: req.body.image,
                        userId: data._id,
                        createTime: moment().utc(),
                        likes: req.body.likes,
                        comments: [{
                            comment: req.body.comment,
                            userId: req.body.userId,
                            createDate: moment().utc()
                        }]
                    });
                    newImage.save(function (err, image) {
                        if (!err) {
                            res.json({error: false, data: image});
                        } else {
                            res.json({error: true, message: "Error on adding Image"})
                        }
                    })
                } else {
                    res.json({error: true, message: "Validation Error", errProps: errProps})
                }
            })
        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};

exports.deleteImage = function (req, res) {
    authHelper.checkToken(req, function (err) {
        if (!err) {
            Images.remove({"_id": req.params.id}, function (err, data) {
                if (!err) {
                    res.json({error: false, data: data})
                } else {
                    res.json({error: true, message: "error on deleting image"})
                }
            })
        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};

exports.getFollowersImages = function (req, res) {
    authHelper.checkToken(req, function (err, data) {
        if (!err) {
            validDataHelper.validateReqData(req, 'body', ['req.body.userId'], function (err, errProps) {
                if (!err) {
                    Users.aggregate([
                        {$unwind: "$following"},
                        {
                            $lookup: {
                                from: "images",
                                localField: "following.iserId",
                                foreignField: "images.userId",
                                as: "img"
                            }
                        },
                        {$unwind: "$img"},
                        {$match: {"img.userId": req.body.userId}},
                        {
                            $group: {
                                _id: "$_id",
                                img: {$push: "$img"}
                            }

                        }
                    ], function (err, img) {
                        if (!err) {
                            res.json({error: false, data: img})
                        } else {
                            res.json({error: true, message: "error!!!"})
                        }
                    })
                } else {
                    res.json({error: true, message: "Error on updating role"})
                }
            })
        }
    })
};

exports.likeImage = function (req, res) {
    authHelper.checkToken(req, function (err) {
        if (!err) {
            Users.findOne({_id: req.params.id}, function (err, user) {
                if (!err && user != null) {

                } else {
                    res.json({error: true, message: "Cant find user."});
                }
            });
        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};