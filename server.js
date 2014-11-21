// set up ======================================================================
var express  = require('express');
var request = require('request');

var app      = express(); 								// create our app w/ express
var port  	 = process.env.PORT || 8080; 				// set the port

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


app.use('/api2', function(req, res) {
    var url = 'http://cabinet.vartacarta.by/api2'+ req.url;
    //var url = 'http://demo.serverist.ru/api2' + req.url;
    var r = null;
    switch(req.method){
        case 'POST':
            r = request.post({uri: url, body: req.body['body']});
            break;
        case 'PUT':
            console.log(req.body['body']);
            var test = "sid:4fc4047eb179b7ae3b71,firstname:\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439,lastname:Misan2,patronymic:Viktarovich,mobile:375295278342,email:senddownrain@gmail.com";
            r = request.put({uri: url,headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, body: test});
            break;
        case 'GET' :
            r = request(url);
    }

    req.pipe(r).pipe(res);
});


// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
