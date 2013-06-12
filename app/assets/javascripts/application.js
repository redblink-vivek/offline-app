//= require jquery
//= require_tree .
$(function () {
	  if ($.support.localStorage)
	  {
		  $(window.applicationCache).bind("error", function() {
			    console.log("There was an error when loading the cache manifest.");
			  });
			  if (!localStorage["pendingItems"]) {
				    localStorage["pendingItems"] = JSON.stringify([]);
			  }
			  $.retrieveJSON("/events.json", function(data) {
				  var pendingItems = $.parseJSON(localStorage["pendingItems"]);
				  $("#events").html($("#eventTemplate").tmpl(data.concat(pendingItems))); 
			  });
			  
			  $('#form_submit').submit(function (e) {
				  var pendingItems = $.parseJSON(localStorage["pendingItems"]);
				  if ($("#name").val()!=''){
				  var item = {"data":$(this).serialize(), "name":$("#name").val()};
				  $("#eventTemplate").tmpl(item).appendTo("#events");
				  pendingItems.push(item);
				  localStorage["pendingItems"] = JSON.stringify(pendingItems);
				  $("#name").val("");
				  }
				  e.preventDefault();
				});
			  
			  function sendPending() {
				    if (window.navigator.onLine) {
				      var pendingItems = $.parseJSON(localStorage["pendingItems"]);
				      if (pendingItems.length > 0) {
				        var item = pendingItems[0];
				        $.post("/", item.data, function (data) {
				          var pendingItems = $.parseJSON(localStorage["pendingItems"]);
				          pendingItems.shift();
				          localStorage["pendingItems"] = JSON.stringify(pendingItems);
				          setTimeout(sendPending, 100);
				        });
				      }
				    }
				  }
			  sendPending();
				  $(window).bind("online", sendPending);
	  }
	  else {
	    alert("Time to upgrade your browser.")
	  }
	});



