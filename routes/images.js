var express = require('express');
var router = express.Router();
var ImagesController = require('../controllers/ImagesController');

router.post('/addImage', function (req, res, next) {
    ImagesController.addImage(req, res);
});
router.delete('/deleteImage/:id', function (req, res, next) {
    ImagesController.deleteImage(req, res);
});

module.exports = router;