
var weatherWidget = {
};

weatherWidget.apiKey = '9a86ce1cc12a8f26';	
weatherWidget.apiUrl = 'http://api.wunderground.com/api/'+ weatherWidget.apiKey + '/conditions/q/Canada/';
// THE DEFAULT GENRE ARRAY?
var genreArray = ['rock', 'indie pop', 'jazz', 'hip hop'];

var echonest = {};

echonest.apiKey = 'LQ7QBJVEMWLNXSXJA'
// The Genre API Method
echonest.apiUrlGenre = 'http://developer.echonest.com/api/v4/genre/artists?'
// Use Artist Profile API Method to get IMAGES or other "non-song" content
echonest.apiUrlArtist = 'http://developer.echonest.com/api/v4/artist/profile?'
// Use to get songs from artist
echonest.apiUrlArtistSongs = 'http://developer.echonest.com/api/v4/artist/songs?'

// a function that randomly selects a value within an array 
var randomize = function(array) {
	return Math.floor(Math.random() * array.length) 
};



//make request for genre
// store artist in variable
//make request for atistSong
//make reuqest for artistImage


// **********************************************************************************
//                              Weather Underground API CODE
// **********************************************************************************

weatherWidget.StateCity = function() {
	$('#cityButton').on('click', function(e) {
		e.preventDefault();
		var weatherStateText = $('#State').find(':selected').text();
		console.log(weatherStateText);
		// $('.music_data').css('display','block');
		$('.weatherConditions').css('width', '40%');
		$('.music_data').css('display', 'block');
		$('.music_data').css('width', '60%');
		$('.songs_container').empty();
		$('.subTitle').css('display', 'none');
		$('.description').css('display', 'none');
		$('.genreBox').css('background-image', 'none');
    var weatherCityText = document.getElementById('city').value;
    console.log(weatherCityText);
    weatherWidget.getInfo(weatherCityText)
		})
};

// Get info from the weather api, just New York for now. Will Grab Info for Toronto location

weatherWidget.getInfo = function(city) {
	$.ajax({
		url:weatherWidget.apiUrl + city + '.json',
		method: 'GET',
		dataType: 'json',

	}).then(function(response){
		console.log(response);
		console.log(response);
		weatherWidget.useInfo(response);
		weatherWidget.displayInfo(response);
		weatherWidget.changeBackground(response);
		// 		need to find out how to create if/else statement for bringing back errors
		// 		$('.weather_string').text("Sorry,");

		// 		$('.temp_c_string span').text("that town or city could not be found.");
		// 		$('.degree').addClass('show');

		// 		$('.city_name').text("Check your spelling and try again.");
	});
};

weatherWidget.displayInfo = function(data) {
	// will console log all the data retrieved from the weather underground api
	console.log(data.current_observation.weather);

	// create a variable for the weather retrieved from api
	var weatherType = data.current_observation.weather;
	var temp = data.current_observation.temp_c;
	var cityName = data.current_observation.observation_location.city;
	var timeLocation = data.current_observation.observation_time_rfc822;

	// the data is turned into a string in the HTML span with a class of "weather_string"
	$('.weather_string').text(weatherType);

	// Same as for current_observation.weather but for temperature in Celsius
	$('.temp_c_string').text(temp);

	// Same as for above but for observation location city name
	$('.city_name').text(cityName);


	// Same as for above but for time in current_observation location
	$('.date_time').text(timeLocation);
	$('.weather_sentence').text('Its ' + weatherType + " and " + temp + " degrees outside right now! You should listen to some...");
};
// Change the Background Image based on WeatherUnderground Observations
weatherWidget.changeBackground = function(weather) {
	var raining = /rain/.test(weather.current_observation.weather);

	if (weather.current_observation.temp_c <= -5 || weather.current_observation.weather === "Light Snow" || weather.current_observation.weather === "Snow" || weather.current_observation.weather === "Heavy Snow") {
		$('body').css('background-image', 'url(images/snow_field.jpg)');
	} else if (weather.current_observation.weather === "Overcast" || weather.current_observation.weather === "Mostly Cloudy" || weather.current_observation.weather === "Partly Cloudy") {
		$('body').css('background-image', 'url(images/overcast_bay.jpg)');
	} else if (weather.current_observation.weather === "Clear") {
		$('body').css('background-image', 'url(images/clear_palmTrees.jpg)');
	} else if (weather.current_observation.weather === 'Light Rain' || weather.current_observation.weather === 'Heavy Rain') {
		$('body').css('background-image', 'url(images/rain_boatInSwell.jpg)');
	} else {
		$('body').css('background-image', 'url(images/default.jpg)');
	}
};
// Select the genre of music to 
weatherWidget.useInfo = function(data) {
	
	if (data.current_observation.weather === 'Overcast' && data.current_observation.temp_c <= -15) {
		var genreArray = ['dark wave', 'death metal', 'hardcore', 'hardcore hip hop'];
	} else if (data.current_observation.temp_c <= -15) {
		var genreArray = ['deep nordic folk', 'trance', 'indie rock'];
	}
	else if (data.current_observation.temp_c <= 0) {
		var genreArray = ['shoegaze', 'smooth jazz', 'chillstep', 'folk', ];
	} 
	else if (data.current_observation.weather === "Overcast" && data.current_observation.temp_c <= 5 ){
		var genreArray = ['contemporary folk', 'emo', 'jazz fusion', 'folk',];

	} else if (data.current_observation.temp_c <= 10) {
		var genreArray = ['alternative americana', 'folk rock', 'psychedelic rock'];
	}
	else if (data.current_observation.weather === "Clear" && data.current_observation.temp_c <= 20) {
		var genreArray = ['old school hip hop', 'funk', 'southern rock','reggae', 'ska']; 
	} else {
		var genreArray = ['rock', 'indie pop', 'jazz', 'hip hop'];
	}
	console.log(genreArray);
	var genreRandomSelection = randomize(genreArray);
	var genreSelection = genreArray[genreRandomSelection];
	console.log(genreSelection);
	$('.genre_name').html(genreSelection);
	echonest.genreAjaxCall(genreSelection);
	echonest.imageDisplay(genreSelection);
};
// Display a stock image because Echonest API images not reliable
echonest.imageDisplay = function(genre){
	genreImage = genre
	if ( genre === 'death metal' || genre ==='hardcore') {
		$('.genreBox').css('background-image', 'url(images/metal.jpg');
	}
	if (genre === 'jazz' || genre === 'smooth jazz' || genre ==='jazz fusion') {
		$('.genreBox').css('background-image', 'url(images/jazz.jpg');
	}
	if (genre === 'indie rock' || genre === 'shoegaze' || genre === 'indie pop' || 'emo') {
		$('.genreBox').css('background-image', 'url(images/indie.jpg');
	}
	if (genre === 'folk' || genre === 'contemporary folk' || genre === 'folk rock') {
		$('.genreBox').css('background-image', 'url(images/folk.jpg');
	}
	if (genre === 'hip hop' || genre === 'old school hip hop' || genre ==='hardcore hip hop') {
		$('.genreBox').css('background-image', 'url(images/hiphop.jpg');
	}
	if (genre === 'psychedelic rock') {
		$('.genreBox').css('background-image', 'url(images/psych_rock.jpg');
	}
	else {
	$('.genreBox').css('background-image', 'url(images/imageBoxDefault.jpg');
	}
};

// ********************************************************************************
// 															ECHO NEST API CALLS
// ********************************************************************************
 
// First AJAX CALL BASED ON GENRE 
echonest.genreAjaxCall = function(genre){
    $.ajax({
        url: echonest.apiUrlGenre,
        method: 'GET',
        dataType: 'json',
        data: {
        	api_key: echonest.apiKey,
        	name: genre
        }
    }).then(function(res){
        // Pick a random artist from the Array of res.response.artists retrieved from the Echonest api
        var artistArray = res.response.artists;
        // do I need to turn this into a number value
        
        // store a random artists value from the API response 
        var index = randomize(artistArray);
        console.log(index)
        // store the name of the "randomized" artist in the variable of artist
        var artist = artistArray[index].name;
    
        echonest.artistSongsAjaxCall(artist);
        // echonest.artistImagesAjaxCall(artist);
        $('.artist_name').html(artist);
    })
    // ***Idea*** Use promises to obtain content in Aside class="music_data" before it "Expands"  
}

// echonest.artistImagesAjaxCall = function(artist) {
// 	$('.image_container').empty();

// 	// second ajax call using artist name obtained in first call
// 	 $.ajax({
//         url: echonest.apiUrlArtist,
//         method: 'GET',
//         dataType: 'json',
//         data: {
//         	api_key: echonest.apiKey,
//         	name: artist,
//         	bucket: 'images'
// 	        }
//     }).then(function(res){
// 			console.log(res.response.artist.images);
// 			echonest.filterArtistImages(res);
// 		})
// }


// echonest.filterArtistImages = function(results) {
// 	var imagesArray = [];
// 	if (results.response.artist.images) {
// 		for (var i = 0; i < results.response.artist.images.length; i += 1) {
// 			if (/last.fm/.test(results.response.artist.images[i].url) === true) {
// 				console.log('shitty last.fm photo!');
// 			} else if (/images.myspacecdn.com/.test(results.response.artist.images[i].url) === true) {
// 				console.log('Myspace, Really Echonest!?');
// 			} else {
// 				imagesArray.push(results.response.artist.images[i].url);
// 			}
// 		}

// 		console.log(imagesArray.length);
// 		if (imagesArray[Math.floor(Math.random() * imagesArray.length)] === undefined) {
// 			console.log('nada');
// 			var fillMurray = $('<img>').addClass('artistImage').attr('src','https://www.fillmurray.com/350/260');
// 			$('.image_container').append(fillMurray);
// 		} else {
// 			var selectedImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
// 			console.log(selectedImage);
// 			displayArtistImage(selectedImage);
// 		}
// 	} else {
// 		console.log('No Acceptable Artist Images');
// 	}
// }

// AJAX CALL FOR SONGS BASED ON ARTIST RETRIEVED FROM FIRST CALL
echonest.artistSongsAjaxCall = function(artist) {
	console.log(artist + ' songs will be called this function');
	$.ajax({
			url: echonest.apiUrlArtistSongs,
			method: 'GET',
			dataType: 'json',
			data: {
				api_key: echonest.apiKey,
				name: artist,
				results: 8
			}
	}).then(function(results){
			console.log(results)
			var songs = results.response.songs
			echonest.displayArtistSongs(songs);
	});
};

echonest.displayArtistSongs = function(contents) {
	$.each(contents, function(i, song){
		console.log(song.title);
		var songList = song.title
		$('.songs_container').append('<li>'+ songList + '</li>');
	});
}

echonest.displayArtistImage = function(image) {
	console.log("this function is going to show "+ image);
	var photo = $('<img>').addClass('artistImage').attr('src', image);
	$('.image_container').append(photo);
}


// ******************************************************************************
//                The Functions that will Run when Document is Ready
// ******************************************************************************

weatherWidget.init = function() {
	weatherWidget.StateCity();
};

$(document).ready(function(){
		
		weatherWidget.init();
		// displayArtistSongs();
});


