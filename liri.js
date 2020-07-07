//Read and set the environment variables (from the .env file)
require("dotenv").config();
//Import the keys.js file and store it in a variable
var keys = require("./keys.js");
//Access keys information
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var request = require("request");

// let input = process.argv.slice(2);
// let command = input[0];
// let param = input.slice(1);

// console.log(" input is: " + input + " command is: " + command + " param is: " + param);

// random();
// concertThis();
// songThis();
// movieThis();

var command = process.argv[2];

    switch(command){
        case "concert-this": let artist = process.argv[3]
            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
            if (!error) {
                console.log("***********************************************");
                console.log("Venue: " + JSON.parse(body)[0].venue.name);
                console.log("Location: " + JSON.parse(body)[0].venue.city + " " + JSON.parse(body)[0].venue.region);
                console.log("Date: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
                console.log("***********************************************");
                }else{
                    console.log(error);
                }
        });

        break;

        case "spotify-this-song": let song = process.argv[3]
            if(song === undefined){song = "Rescue Me"; }
            spotify.search({ type: "track", query: song},
                function(err, data){
                    if(err){
                        return console.log("ERROR: " + err)
                    }
                    console.log("***********************************************");
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Song Name: " + data.tracks.items[0].name);
                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Released: " + data.tracks.items[0].year);
                    console.log("***********************************************");
                    })

        break;

        case "movie-this": let movie = process.argv[3]
            if(movie === undefined){movie = "Pink Panther"; }request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
                if (!error) {
                    console.log("***********************************************");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Year Released: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country Produced: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("***********************************************");
                }
            });

        break;

        case "do-what-it-says":
            random();
    }
    
function random(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        }
        let randomTxt = data.split(",");
        command = randomTxt[0];
        let song = randomTxt[1];
        spotify.search({ type: "track", query: song},
            function(err, data){
                if(err){
                    return console.log("ERROR: " + err)
                }
                console.log("***********************************************");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("***********************************************");
                })
    })
}
