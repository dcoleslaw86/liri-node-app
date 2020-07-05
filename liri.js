require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api")
var request = require("request");
var fs = require("fs");
var axios = require("axios");
var nodeArgs = process.argv;
var newArg = process.argv[2];

