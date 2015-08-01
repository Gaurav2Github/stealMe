var request = require('request');

// Middleware to retrieve the user home timeline
exports.auctionlist = function(req, res, next) {
	req.trademe = req.trademe || {};

	var oauth = {
		consumer_key: req.app.set('oauth consumer key'),
		consumer_secret: req.app.set('oauth consumer secret'),
		token: req.session.oauth.access_token,
		token_secret: req.session.oauth.access_token_secret
	},
	url = 'https://api.' + req.app.set('api domain') + '/v1/Listings/Featured.json?buy=All&clearance=All&condition=All&pay=All&photo_size=Thumbnail&rows=2&sort_order=FeaturedFirst';
	console.log(url);

	request.get({
		url: url,
		oauth: oauth,
		json: true
	}, function(e, r, result) {
		console.log("its a success call");
		console.log(result.List[0]);
		req.trademe.auctionlist = result.List[0];
		next();
	});
};
