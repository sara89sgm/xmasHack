var twilio = require('twilio')('AC8183497cebb16c724f8a12bf235467bf', '56b4b4677822b38484de1112b15079d5');

Parse.Cloud.define("urlSong", function(request, response){

	var Track = Parse.Object.extend("track");
	var queryXmas = new Parse.Query(Track),
		xmas_trid = '',
		xmas_file_name = '',
		other_trid = '',
		other_file_name ='';
	queryXmas.find({
		success: function(results){
			for (var i = 0; i < results.length; i++) { 
		      	var object = results[i];
		      	if(object.get('type')==='xmas'){
		      		xmas_trid = object.get('ec_trid');
		      		xmas_file_name = object.get('url_id');
		      	}else{
		      		other_trid = object.get('ec_trid');
		      		other_file_name = object.get('url_id');
		      	}
		    }
			Parse.Cloud.httpRequest({
				url: 'http://54.217.227.133:8080/test',
				params: {
		    		xmas_id : xmas_trid,
		    		xmas_file : xmas_file_name,
		    		other_id : other_trid,
		    		other_file : other_file_name
		  		},

				success: function(httpResponse) {
					var trackUrl = 'http://xmashackmhd13.parseapp.com/eminem-the-monster-feat.mp3';
		  			var twiml = new twiliolib.TwimlResponse();
		  			console.log("url song called");
		  			response.success(twiml.play(trackUrl).toString());
					
				},
				error: function(httpResponse) {
				    def.resolve("Error");
				}
			});
		}
	});

	
	
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


