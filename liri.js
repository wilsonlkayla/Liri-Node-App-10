require("dotenv").config();

var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

//Tweet function: Uses the Twitter module to calls Twitter's API
var getMyTweets = function(){
 
        var client = new Twitter(keys.twitterKeys);
 
        var params = {screen_name: 'MoeThatCodes'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            for(var i = 0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });

}

//Spotify function: Used to call Spotify's API
var getMeSpotify = function(songName) {
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            var artistArrary = data.tracks.item[0].album.artists;
            var artistNames = [];
            for (let i = 0; i < artistsArray.length; i++) {
                artistNames.push(artistArrary[i].name);
            }

           

        });
    }

//When calling the function in Node, Node will pull the information from Spotify's API Key to print out the information listed from the user input song.
// ex: node liri.js spotify-this-song Money
// node will print out 20 results from Spotify's database listing the information we called above
// Song about Money
// The Artist
// The Album
// the direct link to the spotify profile

function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "mr nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            var movieResults =
            "------------------------------ begin ------------------------------" + "\r\n"
            "Title: " + movieObject.Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
            "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
            "------------------------------ fin ------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults); // calling log function
        } else {
            console.log("Error :"+ error);
            return;
        }
    });
};

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        default: 
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

	// Do What It Says function, uses the reads and writes module to access the random.txt file and do what's written in it
	function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatItSaysResults = data.split(",");
				spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});
	};
	// Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
	function log(logResults) {
	  fs.appendFile("log.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}