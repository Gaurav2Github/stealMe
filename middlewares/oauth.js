// Thanks to Matt Hill for this example of how to connecto to Twitter using oauth module
// http://moonlitscript.com/post.cfm/how-to-use-oauth-and-twitter-in-your-node-js-expressjs-app/

var OAuth = require('oauth').OAuth,
	oauth_version = '1.0',
	oauth_encryption = 'HMAC-SHA1',
	oa = null, domain = null;


// Initialize OAuth object
exports.initialize = function(consumer_key, consumer_secret, callback_url, api_domain) {
    domain = api_domain;
    var request_token_url = 'https://secure.' + domain +'/Oauth/RequestToken?scope=MyTradeMeRead',
        access_token_url = 'https://secure.' + domain +'/Oauth/AccessToken ';
    oa = new OAuth(request_token_url, access_token_url, consumer_key, consumer_secret, oauth_version, callback_url, oauth_encryption);
}

// Middleware to detect if the client is or not authenticated to Trade Me
// if not, start the OAuth process; if so, just let the normal flow continue
exports.auth = function(req, res, next) {
	if (req.session.oauth && req.session.oauth.access_token && req.session.oauth.access_token_secret) {
		next();
	} else {
		oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
			if (error) {
				res.send('Something went wrong!');
				throw error;
			} else {
				req.session.oauth = {};
				req.session.oauth.token = oauth_token;
				req.session.oauth.token_secret = oauth_token_secret;
				res.redirect('https://secure.' + domain +'/Oauth/Authorize?oauth_token=' + oauth_token);
			}
		});
	}
}
// Middleware to keep the /callback route clean.
// Handles the redirect url and saves tokens to session.
exports.callback = function(redirect) {
	return function(req, res, next) {
		if (req.session.oauth) {
			req.session.oauth.verifier = req.query.oauth_verifier;
			var oauth = req.session.oauth;

			oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, function(error, oauth_access_token, oauth_access_token_secret) {
				if (error) {
					res.send('yeah something broke.');
				} else {
					req.session.oauth.access_token = oauth_access_token;
					req.session.oauth.access_token_secret = oauth_access_token_secret;
					res.redirect(redirect);
				}
			});
		} else {
			next(new Error('you\'re not supposed to be here.'));
		}
	}
}
