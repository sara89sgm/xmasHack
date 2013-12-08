var twilio = require('twilio')('AC8183497cebb16c724f8a12bf235467bf', 'c1805ed5bd9fc3a8d17a200688421600');
var twiliolib = require('twilio');
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.post('/urlSong', function(req, res) {
	var params = req.url.split("=");
	var id = params[1];
  	var remix = Parse.Object.extend("Remix");
  	console.log(id);
	var remixQuery = new Parse.Query(remix);
	remixQuery.equalTo('xmas_id', id);
	remixQuery.first({
		success: function(result){
			var trackUrl = result.get('url');
			console.log(trackUrl);
  			var twiml = new twiliolib.TwimlResponse();
  			res.send(twiml.play(trackUrl).toString());	
		},
		error: function(httpResponse) {
		    res.send("Error");
		}
	});	
});

app.all('/callback', function(req,res) {
  res.send('Callback!');
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
