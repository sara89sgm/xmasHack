var remixer = require('cloud/remix.js');
var twilio = require('twilio');

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
  response.success();
});

