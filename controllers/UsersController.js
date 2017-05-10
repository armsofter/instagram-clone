var jwt = require('jsonwebtoken');
var Users = require('../models/Users');
var sha256 = require('sha256');
var authHelper = require('../helpers/authHelper');
var validDataHelper = require('../helpers/validDataHelper');
var followCheck = require('../helpers/followCheck');

exports.registration = function (req, res) {
    Users.findOne({username: req.body.username}, function (err) {
        if (err) {
            res.json({error: true, message: "Not Valid"})
        } else {
            var newUser = new Users({
                username: req.body.username,
                email: req.body.email,
                avatar: req.body.avatar,
                followers: req.body.followers,
                following: req.body.following,
                password: sha256(req.body.password),
                token: jwt.sign({data: req.body}, global.secret),
                isPrivate: req.body.isPrivate,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                description: req.body.description
            });
            newUser.save(function (err, data) {
                if (!err) {
                    res.json({error: false, user: data});
                } else {
                    res.json({error: true, message: "Error on registration!", errCode: err});
                }
            })
        }
    })
};

exports.logIn = function (req, res) { // username, password
    validDataHelper.validateReqData(req, 'body', ['username', 'password'], function (err, errProps) {
        if (!err) {
            Users.findOne({
                username: req.body.username,
                password: sha256(req.body.password)
            }, function (err, user) {
                if (!err && user != null) {
                    res.json({
                        error: false, token: jwt.sign({
                            username: user.username, password: user.password,
                            id: user._id, email: user.email
                        }, global.secret)
                    })
                } else {
                    res.json({error: true, message: "Cant find user."});
                }
            });
        } else {
            res.json({error: true, message: "Validation error", errProps: errProps});
        }
    });
};

exports.getUser = function (req, res) { // user_id
    authHelper.checkToken(req, function (err) {
        if (!err) {
            Users.findOne({_id: req.params.id}, function (err, data) {
                if (!err) {
                    res.json({error: false, data: data});
                } else {
                    res.json({error: true, message: "Error on getting users."});
                }
            })
        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};

exports.deleteUser = function (req, res) {
    authHelper.checkToken(req, function (err) {
        if (!err) {
            Users.remove({"_id": req.params.id}, function (err, data) {
                if (!err) {
                    res.json({error: false, data: data})
                } else {
                    res.json({error: true, message: "error on deleting User"})
                }
            })
        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};


exports.followUser = function (req, res) {
    authHelper.checkToken(req, function (err, data) {
        if (!err) {
            Users.findOne({_id: req.params.id}, function (err, user) {
                if (!err && user != null) {
                        user.followers.push(data.id);
                        user.save(function (err, user) {
                            if (!err) {
                                Users.findOne({_id: data.id}, function (err, user1) {
                                    if (!err) {
                                        user1.following.push(req.params.id);
                                        user1.save(function (err, data) {
                                            if (!err) {

                                            } else {

                                            }
                                        })
                                    }
                                });
                                res.json({error: false, message: "Saved", data: user});
                            } else {
                                res.json({error: true, message: "Cant save follower"});
                            }
                        })
                } else {
                    res.json({error: true, message: "Cant find user."});
                }
            });
        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};

exports.unfollowUser = function (req, res) {
    authHelper.checkToken(req, function (err, data) {
        if (!err) {

        } else {
            res.json({error: true, message: "error on verification"})
        }
    })
};
