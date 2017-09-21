var URLapi = "https://en.wikipedia.org/w/api.php?callback=?";

$(document).ready(function() {
	var jsonData = "";

	$("#searchText").keydown(function(event) {
		if (event.keyCode === 13) {
			if ($("#searchText").val().length > 0) {
				search();
			}
		}
	});

	$("#searchBtn").click(function() {
		if ($("#searchText").val().length > 0) { 
			search();
		}
	});

	function search() {
		// empty result area first
		$("#resultData").empty();

		$.getJSON(URLapi, {
	    	action: "query",
	        format: "json",
	        inprop: "url",
	        formatversion: 2,
	        generator: "search",
	        gsrsearch: $("#searchText").val(),
	        gsrwhat: "text",
	        prop: "extracts|info",
	        exsentences: 3,
	        exintro: "",
	        explaintext: "",   
	        exlimit: 20
	    })
	    .done(function(resp) {
	    	console.log(resp);
	    	jsonData = resp.query.pages;
	    	displaySearchData(jsonData);
		});
	}

	function displaySearchData(jsonData) {
		jsonData.forEach(function(data) {
			$("#resultData").append(
				"<div class='resultItem'><a href='"+data.fullurl+"' target='_blank'><h3>"+data.title+"</h3>"+data.extract+"</a></div>"
			);
		});
	}
});