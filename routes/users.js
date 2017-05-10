var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController');


router.post('/registration', function (req, res, next) {
    UsersController.registration(req, res);
});
router.post('/logIn', function (req, res, next) {
    UsersController.logIn(req, res);
});
router.get('/getUser/:id', function (req, res, next) {
    UsersController.getUser(req, res);
});

router.delete('/deleteUser/:id', function (req, res, next) {
    UsersController.deleteUser(req, res);
});

router.put('/followUser/:id', function (req, res, next) {
    UsersController.followUser(req, res);
});
router.put('/unfollowUser/:id', function (req, res, next) {
    UsersController.unfollowUser(req, res);
});
module.exports = router;
