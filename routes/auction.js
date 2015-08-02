var index = function(req, res) {
    res.render('home', { auctionlist: req.trademe.auctionlist })
};

exports.index = index;