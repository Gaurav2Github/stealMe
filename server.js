var express = require('express'),
    auction = require('./routes/auction.js'),
    index = require('./routes/index.js'),
	exphbs  = require('express-handlebars'),
	cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    oa_controller = require('./middlewares/oauth'),
	auctionlist = require('./middlewares/auctionlist');

var app = express();

if (process.env.PORT) {
    //Not working right now.
    app.set('oauth consumer key', process.env.oauthkey);
    app.set('oauth consumer secret', process.env.oauthsecret);
    app.set('app domain', 'http://steelme.heroku.com');
    app.set('api domain', process.env.apidomain || 'tmsandbox.co.nz');
    console.log('windows azure/production');

} else {
    //dev is working
    var config = require('./config.json');
    app.set('oauth consumer key', config.key);
    app.set('oauth consumer secret', config.secret);
    app.set('app domain', 'http://localhost:3000');
    app.set('api domain', 'tmsandbox.co.nz');
    console.log('dev');
}

app.set('views', './views');
app.set('view engine', 'handlebars');
app.set('oauth callback', '/callback');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(cookieParser());
app.use(session({
	key: 'trademe-demo.sid',
	secret: 'a really great secret message that is neat'
}));

app.use(express.static(__dirname + '/public'));

oa_controller.initialize(
    app.set('oauth consumer key'),
    app.set('oauth consumer secret'),
    app.set('app domain') + app.set('oauth callback'),
    app.set('api domain'));


// ## Routes
// ### Main (and only) route
app.get('/', oa_controller.auth, auctionlist.auctionlist, index.index);

//app.get('/raffles',oa_controller.auth, auctionlist.auctionlist);

// ### Watchlist route
app.get('/auctionlist', oa_controller.auth, auctionlist.auctionlist, auction.index);

// ### Callback route
// Will only be used after OAuth login.
app.get('/callback', oa_controller.callback('/'));

app.use(bodyParser.json());
app.get('/api/raffles.json', function (req, res) {
    res.json([
        { ListingId: 4205251,
            Title: 'Android Nexus 5',
            Price: 4000,
            PotAmount: 300},
        { ListingId: 4205251,
            Title: 'Iphone 6',
            Price: 4000,
            PotAmount: 200},
        { ListingId: 4205251,
            Title: 'Android Nexus 6',
            Price: 4000,
            PotAmount: 500},

    ] );
    //res.json(auctionlist.auctionlist);
})

// ### Middleware to handle 404
var notFound = function(req,res,next){
    res.statusCode = 404;
    res.description = 'Not found';
    res.render('404');
};
// ### Middleware to internal server errors
var errorHandler = function(err,req,res,next){
    res.render('error',{description:'Please check the URL.'});
};
app.use(notFound);
app.use(errorHandler);

// ### Start Express
var start = function(port){
    return app.listen(port, function() {
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
};
var server = start(process.env.PORT || 3000);
