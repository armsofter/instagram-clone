var jwt = require('jsonwebtoken');
var Users = require('../models/Users');

//function for authentication checking through token
//token can be sent by post body, url params and by headers
exports.checkToken = function (req, callback) {
    var token = req.body.token || req.headers.token || req.params.token;
    if (typeof token != 'undefined' && token != null && token != '') {
        jwt.verify(token, global.secret, function (err, decoded) {
            if (!err && typeof decoded != 'undefined') {
                Users.findOne({username: decoded.data.username}, function (err, user) {
                    if (!err && user != null) {
                        user.token = "";
                        user.token = jwt.sign({data: user}, global.secret);
                        user.save(function (err, data) {
                            if (!err) {
                                callback(false, data)
                            } else {
                                callback(true, {});
                            }
                        });
                    } else {
                        callback(true, {});
                    }
                });
            } else {
                callback(true, {});
            }
        });
    } else {
        callback(true, {})
    }
};