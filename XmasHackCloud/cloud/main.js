var remixer = require('cloud/remix.js');
var twilio = require('twilio')('AC6fce2fb8441b4279897882f82ad80ed3', 'c1805ed5bd9fc3a8d17a200688421600');
var twiliolib = require('twilio')

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("destroyCarol", function(request, response) {

	var Track = Parse.Object.extend("track");
	var queryXmas = new Parse.Query(Track);
	queryXmas.equalTo("type", "xmas");
	queryXmas.first({
		success: function(xmasTrack){
			var queryPop = new Parse.Query(Track);
			queryPop.notEqualTo("type", "xmas");
			queryPop.first({
				success: function(popTrack){
					mixTracks(xmasTrack, popTrack);
				}
			})
		}
	})
  
});

//also not tested!
function makeURL(){
  var trackUrl = '/public/eminem-the-monster-feat.mp3';
  var twiml = new twiliolib.TwimlResponse();
  return twiml.play(trackUrl).toString();
}

Parse.Cloud.define("receiveSMS", function(request, response) {
  console.log("Received a new text: " + request.params.From);


  // I haven't tested this!
  twilio.makeCall({
	    to: request.params.From, 
	    from: '+441753463246', 
	    url: makeURL() // this may need to be an endpoint
	  }, function(err, responseData) { 
	    if (err) {
	      console.log(err);
	    } else { 
	      console.log(responseData.from); 
	      console.log(responseData.body);
	    }
	  }
	);
	// Send an SMS message
	twilio.sendSms({
	    to: request.params.From, 
	    from: '+441753463246', 
	    body: 'Hello world!'
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
		    def.resolve("Error");
		}
	});
});


