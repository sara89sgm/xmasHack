//var remixer = require('cloud/remix.js');
var twilio = require('twilio')('AC6fce2fb8441b4279897882f82ad80ed3', 'c1805ed5bd9fc3a8d17a200688421600');
var twiliolib = require('twilio');

var express = require('express');
var app = express();

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
/*Parse.Cloud.define("destroyCarol", function(request, response) {

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
*/

app.get("/receiveSMS", function(request, response) {
  console.log("Received a new text: " + request.params.From);

  twilio.makeCall({
      to: request.params.From,
	    from: '+441753463246', 
      url: '/makeCall'
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

app.listen(3000);
