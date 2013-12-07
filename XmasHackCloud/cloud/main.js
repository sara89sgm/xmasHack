var remixer = require('cloud/remix.js');
var twilio = require('twilio')('AC6fce2fb8441b4279897882f82ad80ed3', 'c1805ed5bd9fc3a8d17a200688421600');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("destroyCarol", function(request, response) {



	// var User = Parse.Object.extend("User");
	// var query = new Parse.Query(User);
	// query.equalTo("fbId", request.params.channel );
	// query.first({
	//   success: function(result) {
	//   	var id= result.id;
	//   	var chan = 'GOS'+id;
	//   	Parse.Push.send({
	// 	  channels: [ chan],
	// 	  data: {
	// 	    alert: 'New Gossapp Message',
	// 	    from: request.params.usuario,
	// 	  }
	// 	}, {
	// 	  success: function() {
	// 	    response.success();
	// 	  },
	// 	  error: function(error) {
	// 	    response.error();
	// 	  }
	// 	});
	//   },
	//   error: function(error) {
	//     alert("Error: " + error.code + " " + error.message);
	//   }
	// });
  
});

Parse.Cloud.define("receiveSMS", function(request, response) {
  console.log("Received a new text: " + request.params.From);
  var client = require('twilio')
 
	// Send an SMS message
	client.sendSms({
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

