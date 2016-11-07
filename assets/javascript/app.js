
$(document).on('ready', function() {
	$("#secChoice").css("display", "none");
	$("#genres").css("display", "none");
	$("#foodChoi").css("display", "none");
	$("#foodie-detail").hide();
	$("#movie-detail").hide();

	var tmdb_api_key = '352f498b61873be15b52924f22ef2ac2';
	var genre_list_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+tmdb_api_key;
	var guideBoxApiKey = 'toZrSHYEOKuOaC4Y71KeOrkR5oYhn5';
	var trigger = '';


	// var guideBoxKey = 'rKxpJKiDZEB3HPJvZQJVMhPlmQzwe8HY',
	// movieDump = 'https://api-public.guidebox.com/v1.43/US/toZrSHYEOKuOaC4Y71KeOrkR5oYhn5/search/movie/title/'+guideBoxTitle;

	//INIT FIREBASE
	  var movieBase = {
	  	apiKey: "AIzaSyASIoV3ldP02Ezks2PSJKnrv-ZXKwOoCXE",
    	authDomain: "group-project-2c55c.firebaseapp.com",
    	databaseURL: "https://group-project-2c55c.firebaseio.com",
    	storageBucket: "group-project-2c55c.appspot.com",
	  };

  firebase.initializeApp(movieBase);

  var movieBase = firebase.database();

		$('#begin figure').on('click', function() {

				var initChoice = $(this).attr('id');

  		 		if (initChoice == 'in') {
  		 			$("#begin").hide();
  		 			$("#secChoice").show();
  		 			console.log(trigger);
  		 		} else {
  		 			console.log($(this).attr('id'));
	  		 	 	console.log("what up");
  		 		}
  		 	})

		$('#secChoice figure').on('click', function() {

				var secondChoice = $(this).attr('id');
				console.log(secondChoice);

  		 		if (secondChoice == 'watch' && (trigger == '')) {
  		 			$("#secChoice").hide();
  		 			$("#watch").hide();
  		 			$("#genres").show();
  		 			trigger = "movie";
  		 			console.log(trigger);
  		 		} else if (secondChoice == 'munch' && (trigger == '')) {
  		 			$("#secChoice").hide();
  		 			$("#genres").hide();
  		 			$("#foodChoi").show();
  		 			console.log($(this).attr('id'));
	  		 	 	console.log("what up");
	  		 	 	console.log(trigger);
	  		 	 	trigger = "munch";
	  		 	 } else if (secondChoice == 'munch' && (trigger == "movie")) {
  		 			$("#secChoice").hide();
  		 			$("#genres").hide();
  		 			$("#foodChoi").show();
  		 			console.log($(this).attr('id'));
	  		 	 	console.log("what up");
	  		 	 	console.log(trigger);
	  		 	} else {
	  		 		$("#secChoice").hide();
	  		 		$("#genres").show();
  		 			console.log($(this).attr('id'));
	  		 	 	console.log("what up");
	  		 	 	console.log(trigger);
  		 		}
  		 	})

		$('#genres figure').one('click', function() {

				$('#movie-detail').empty();
				var x = Math.floor((Math.random() * 10) + 1);
				var genre_id = $(this).data('id'),
				movie_list_url = 'https://api.themoviedb.org/3/genre/'+genre_id+'/movies?api_key='+tmdb_api_key+'&page='+x;

			//GRAB MOVIE BY GENRE
			$.getJSON(movie_list_url, function (response) {

					var random = Math.floor(Math.random()*response.results.length);
					var movie_button = $('<button class="movie ctrl-standard is-reversed typ-subhed fx-bubbleDown" data-id="'+response.results[random].id+'">'+response.results[random].title+'</button>');

					$('#movie-detail').empty();

					var guideBoxTitle = response.results[random].id,
						movie_detail_url = 'https://api-public.guidebox.com/v1.43/US/rKxpJKiDZEB3HPJvZQJVMhPlmQzwe8HY/search/movie/id/themoviedb/'+guideBoxTitle;
						console.log(movie_detail_url);

					$.getJSON(movie_detail_url, function (response) {
						console.log(response.id);
						console.log(response);

						var guideBoxId = response.id;
						var guideBoxId_url = 'https://api-public.guidebox.com/v1.43/US/rKxpJKiDZEB3HPJvZQJVMhPlmQzwe8HY/movie/'+guideBoxId;
						
							$.getJSON(guideBoxId_url, function (response) {
								console.log(guideBoxId_url);
								console.log(response.id);
								console.log(response);
								console.log(response.purchase_web_sources[0].link);

								var movPurchase = response.purchase_web_sources[0].link;
								var movPurchases = response.purchase_web_sources[1].link;
								var moveTitle = response.title;
								var movePoster = response.poster_400x570;

								var purchase = response.purchase_web_sources[0].link;
								var purchases = response.purchase_web_sources[1].link;

											movieBase.ref().update({
											title: moveTitle,
											poster: movePoster,
											purchase: movPurchase,
											purchases: movPurchases,
										})

								var movie_detail = '<h1><strong>'+response.title+'</strong></h1>'+'<div id="boner"><img src='+response.poster_400x570+'></div><a class="linky" href='+purchase+' target="_blank"><img id="left" src="http://www.niftybuttons.com/itunes/itunesbutton1.png" alt="iTunes Button (via NiftyButtons.com)"></a><a class="linky" href='+purchases+' target="_blank"><img id="right" src="http://www.niftybuttons.com/amazon/amazon-button9.png" alt="Amazon Button (via NiftyButtons.com)"></a>';
								$('#movie-detail').append(movie_detail);
						});

					});

			});
			if (trigger == "munch") {
				$("foodChoi").hide();
				$("#secChoice").hide();
				$("#genres").hide();
				console.log("should wrap up the loop");
				console.log("Should be success");
				$("#foodie-detail").show();
				$("#movie-detail").show();

			} else {
				trigger == "movie";
				console.log(trigger);
				console.log("first WATCH runthrough");
			$("#secChoice").show();
			$("#genres").hide();
			$("#watch").hide();
			$("#munch").show();
		}

		});

		$('#foodChoi figure').one('click', function() {

				// $('#foodie-detail').empty();
				// var x = Math.floor((Math.random() * 10) + 1);
				var food_id = $(this).attr('id');
				var recipe_list_url = 'http://food2fork.com/api/search?key=24d0b4ec6120c982a1f02c7e4873ecd3&q='+food_id;
				console.log(food_id);
				var food2ForkApiKey = '24d0b4ec6120c982a1f02c7e4873ecd3';
				console.log(recipe_list_url);

			//GRAB MOVIE BY GENRE
			$.getJSON(recipe_list_url, function (response) {
				console.log(food_id);

				var random = Math.floor(Math.random()*response.recipes.length);
			
				var recipe_list_url = 'http://food2fork.com/api/search?key=24d0b4ec6120c982a1f02c7e4873ecd3&q='+food_id;
				$('#foodie-detail').empty();
				$("#foodChoi").hide();

				var x = Math.floor(Math.random()*response.recipes.length);
				console.log(response.recipes[x].title);
				console.log(response.recipes[x].source_url);
				console.log(response.recipes[x].image_url);

								var foodTitle = response.recipes[x].title;
								var foodImg = response.recipes[x].image_url;
								var foodList = response.recipes[x].source_url;

											movieBase.ref().update({
											recipeTitle: foodTitle,
											recipeImg: foodImg,
											recipeLink: foodList,
										})

				var recipe_detail = '<h1><strong>'+response.recipes[x].title+'</strong></h1>'+'<div id="boner"><img src='+response.recipes[x].image_url+'></div><a class="linky" href='+response.recipes[x].source_url+' target="_blank">EAT THIS SHIT</a>';
				$('#foodie-detail').append(recipe_detail);
			});

			if (trigger == "movie") {
				$("#foodChoi").hide();
				$("#secChoice").hide();
				console.log("loop finished successfully with food as second choice");
				console.log("should also be success");
				$("#foodie-detail").show();
				$("#movie-detail").show();
			} else {
			$("#secChoice").show();
			$("#munch").hide();
			$("#watch").show();
			console.log("first time through with food");
			trigger = "munch";
			console.log(trigger);
		}
		});

});









