var remixer = require('cloud/remix.js');
var twilio = require('twilio')('AC8183497cebb16c724f8a12bf235467bf', '56b4b4677822b38484de1112b15079d5');
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

Parse.Cloud.define("urlSong", function(request, response){
	var trackUrl = 'http://xmashackmhd13.parseapp.com/eminem-the-monster-feat.mp3';
  	var twiml = new twiliolib.TwimlResponse();
  	console.log("url song called");
  	response.success(twiml.play(trackUrl).toString());
});

Parse.Cloud.define("receiveSMS", function(request, response) {
  console.log("Received a new text: " + request.params.From);


  // I haven't tested this!
  twilio.makeCall({
	    to: request.params.From, 
	    from: '+441753463215', 
	    url: 'https://XR0ZKYGKkZkbSJhl0wQPReSrqHtiVOewuPnWnGsW:javascript-key=GE6l0oAiQHxWDIDiXV2odZ3b8qEqLy9WzZc0LTno@api.parse.com/1/functions/urlSong' // this may need to be an endpoint
	  }, function(err, responseData) { 
	    if (err) {
	      console.log(err);
	    } else { 
	      console.log(responseData.from); 
	      console.log(responseData.body);
	    }
	  }
	);
  console.log("Making call");
	// Send an SMS message
	twilio.sendSms({
	    to: request.params.From, 
	    from: '+441753463215', 
	    body: 'Xmas Hack'
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


