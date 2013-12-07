var twilio = require('twilio')('AC8183497cebb16c724f8a12bf235467bf', '56b4b4677822b38484de1112b15079d5');
var twiliolib = require('twilio');

exports.getRemix = function(numberTo, id, response) {
	var remix = Parse.Object.extend("Remix");
	console.log(id);
	var remixQuery = new Parse.Query(remix);
	remixQuery.equalTo('xmas_id', id);
	remixQuery.find({
		success: function(results){
			console.log(results);
			if(results.length>0){
				console.log(results.length);
				exports.sendRemix(numberTo, id, response);
				
			}else{
				twilio.sendSms({
				    to: numberTo, 
				    from: '+441753463215', 
				    body: 'We cannot destroy that carol now, check in 2 min again, F*** Xmas!'
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
				exports.createRemix(id);
			}
		},
		error: function(httpResponse) {
		    console.log(httpResponse);
		    
		}
	});
}

var callRemix = function(numberTo, id, response){
	twilio.makeCall({
	    to: numberTo, 
	    from: '+441753463215', 
	    url: 'http://xmashackmhd13.parseapp.com/urlSong?id='+id // this may need to be an endpoint
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

exports.createRemix = function(id){
	var xmas_file_name ='';

	Parse.Cloud.httpRequest({
		url: 'http://api.deezer.com/track/'+id,
		success: function(response) {
			console.log(response.title);
			xmas_file_name = ''+response.preview;
			Parse.Cloud.httpRequest({
				url: 'http://54.217.227.133:8080/test',
				params: {
		    		xmas_id : id,
		    		xmas_file : xmas_file_name
		  		},

				success: function(httpResponse) {
					//Save it on Parse
					
				},
				error: function(httpResponse) {
				    def.resolve("Error");
				}
			});
			
		},
		error: function(httpResponse) {
		    def.resolve("Error");
		}
	});
}

exports.sendRemix = function(numberTo, id, response){
	twilio.makeCall({
	    to: numberTo, 
	    from: '+441753463215', 
	    url: 'http://xmashackmhd13.parseapp.com/urlSong?id='+id // this may need to be an endpoint
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
