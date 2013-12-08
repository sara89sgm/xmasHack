
var twilio = require('twilio')('AC6fce2fb8441b4279897882f82ad80ed3', 'c1805ed5bd9fc3a8d17a200688421600');
var twiliolib = require('twilio');
require('cloud/app.js');
var xmasMixer = require('cloud/xmasMixer.js');


Parse.Cloud.define("receiveSMS", function(request, response) {
  	console.log("Received a new text: " + request.params.From);

  	var id = request.params.id;
  	var numberTo = request.params.From;

  	xmasMixer.getRemix(numberTo, id, response);

  	
});

Parse.Cloud.define("helpXmas", function(request, response) {
  	console.log("Received a new text: " + request.params.From);

  	var body = request.params.Body;
  	var numberTo = request.params.From;
  	if(body.toUpperCase() === 'HELP XMAS'){
  		var remix = Parse.Object.extend("Remix");
		var remixQuery = new Parse.Query(remix);
		remixQuery.find({
			success: function(results){
				console.log(results);
				if(results.length>0){
					var num = Math.floor((Math.random()*results.length));
					var id = results[num].get('xmas_id');
					xmasMixer.sendRemix(numberTo, id, response);
					
				}
			},
			error: function(httpResponse) {
			    console.log(httpResponse);
			    
			}
		});
  	}else{
  		console.log("Sendind sms", numberTo);
		twilio.sendSms({
		    to: numberTo, 
		    from: '+441633538987', 
		    body: 'buuuuu'
		}, function(err, responseData) { 
		    if (err) {
		      console.log(err);
		    } else { 
		      console.log(responseData.from); 
		      console.log(responseData.body);
		    }
		  }
		);
		response.success();
  	}
  	

  	
});



Parse.Cloud.define("addTrack", function(request, response) {

var url = 'http://labs.echonest.com/SCAnalyzer/analyze?id='+request.params.idtrack;
console.log(url);

    Parse.Cloud.httpRequest({
		url: url,

		success: function(httpResponse) {
			var track_id = httpResponse.data.trid;
			console.log(track_id);
			var Track = Parse.Object.extend("Track");
			var track = new Track();
			 
			track.set("ec_trid", track_id );
			track.set("type", request.params.type);
			track.set("url_id", request.params.idtrack);
			 
			track.save(null, {
			  success: function(track) {
			    response.success(track);
			  },
			  error: function(gameScore, error) {
			    console.log('Failed to create new object, with error code: ' + error.description);
			  }
			});
			
		},
		error: function(httpResponse) {
		    console.log(httpResponse.data);
		}
	});
});


Parse.Cloud.define("createRemix", function(request, response) {

var id = request.params.id;
	xmasMixer.createRemix(id);
	response.sucess("ok");
});


