
var twilio = require('twilio')('AC8183497cebb16c724f8a12bf235467bf', '56b4b4677822b38484de1112b15079d5');
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

  	var body = request.params.body;
  	if(body === 'help'){
  		var numberTo = request.params.From;
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
  		console.log("Sendind sms");
		twilio.sendSms({
		    to: numberTo, 
		    from: '+441753463215', 
		    body: 'Do you need help with xmas carols??? send me a sms with the word: help'
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


