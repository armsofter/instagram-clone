exports.isFollowing = function (id, followingArr) {
    var current = followingArr.filter(function (obj) {
        return obj._id === id;
    });
    return !!current.length
};

