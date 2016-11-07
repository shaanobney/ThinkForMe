$(function() {

	var tmdb_api_key = '352f498b61873be15b52924f22ef2ac2',
		genre_list_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+tmdb_api_key;

	var guideBoxKey = '',
		movieDump = '';

	//LIST GENRES

		$('#genres button').click(function() {

			$('#movies').empty();
			$('#movie-detail').empty();

			var genre_id = $(this).data('id'),
				movie_list_url = 'https://api.themoviedb.org/3/genre/'+genre_id+'/movies?api_key='+tmdb_api_key;

			//GRAB MOVIES BY GENRE
			$.getJSON(movie_list_url, function (response) {

				$.each(response.results, function(i, movie) {
					var movie_button = $('<button class="movie ctrl-standard is-reversed typ-subhed fx-bubbleDown" data-id="'+movie.id+'">'+movie.title+'</button>')
					//add a variable that's an array to hold both movie.id or movie.title. 
					$('#movies').append(movie_button);
				});
				//at this point create some random math to take the retults of the array and append it to a result box as well as send the data to firebase.
				$('#movies button').click(function() {

					$('#movie-detail').empty();
					var movie_id = $(this).data('id'),
						movie_detail_url = 'https://api.themoviedb.org/3/movie/'+movie_id+'?api_key='+tmdb_api_key;

					$.getJSON(movie_detail_url, function (movie) {

						var movie_detail = '<div class="movie-detail">'+'<img src=http://image.tmdb.org/t/p/w185/'+movie.poster_path+'>'+'<p><strong>'+movie.title+'</strong><br>"'+movie.overview+'</p>'+'</div>';
						$('#movie-detail').append(movie_detail);
					});
				});

			});

		}); 

	

});