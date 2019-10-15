//COMMANDS: concert-this, spotify-this-song, movie-this, do-what-it-says

require("dotenv").config();
const fs = require("fs");
const request = require('request');
const figlet = require('figlet');
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");

const chalk = require('chalk');

const command = process.argv[2];
const parameter = process.argv[3];




function switchCase() {

    switch (command) {

        case 'concert-this':
            bandsInTown(parameter);
            break;

        case 'spotify-this-song':
            spotifySong(parameter);
            break;

        case 'movie-this':
            omdbInfo(parameter);
            break;

        case 'do-what-it-says':
            getRandom();
            break;

        default:
            display("Invalid. Does not compute. Self-destructing in 3..2..1..");
            break;

    }
};

//BANDS IN TOWN

function bandsInTown(parameter) {

    if ('concert-this') {
        var artist = "";
        for (let i = 3; i < process.argv.length; i++) {
            artist += process.argv[i];
        }
        let bandsFig = "Bandsintown"
        figlet(bandsFig, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk.green(data));
        });
        console.log(artist);
    }
    else {
        artist = parameter;
    }



   let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            let JS = JSON.parse(body);
            for (i = 0; i < JS.length; i++) {
                let dateForm = moment(JS[i].datetime).format('LL');
               
                display(chalk.blue("\n---------------------------------------------------\n"));
                display(chalk.green("Artist(s): " + JS[i].lineup));
                display(chalk.green("Name: " + JS[i].venue.name));
                display(chalk.green("City: " + JS[i].venue.city));
                if (JS[i].venue.region !== "") {
                    display(chalk.green("State: " + JS[i].venue.region));
                }
                display(chalk.green("Country: " + JS[i].venue.country));
                display(chalk.green("Date: " + dateForm));
                display(chalk.blue("\n---------------------------------------------------\n"));

            }
        }
    });
}

//SPOTIFY
let spotifyFig = "Spotify"

function spotifySong(parameter) {


    let searchTrack;
    if (parameter === undefined) {
        searchTrack = "Ace of Base The Sign";
    } else {
        searchTrack = parameter;
    }

    figlet(spotifyFig, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.green(data));
    });

    spotify.search({
        type: 'track',
        query: searchTrack
    }, function (error, data) {
        if (error) {
            display('Error recorded: ' + error);
            return;
        } else {
            display(chalk.blue("\n---------------------------------------------------\n"));
            display(chalk.green("Artist: " + data.tracks.items[0].artists[0].name));
            display(chalk.green("Song: " + data.tracks.items[0].name));
            display(chalk.green("Preview: " + data.tracks.items[3].preview_url));
            display(chalk.green("Album: " + data.tracks.items[0].album.name));
            display(chalk.blue("\n---------------------------------------------------\n"));

        }

    });
};

//OMDB

function omdbInfo(parameter) {


   let findMovie;
    if (parameter === undefined) {
        findMovie = "Mr. Nobody";
    } else {
        findMovie = parameter;
    };

    let omdbFig = "OMDB"
    figlet(omdbFig, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.green(data));
    });

    axios.get("http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

    
        // if (!err && res.statusCode === 200) {
            display(chalk.blue("\n---------------------------------------------------\n"));
            display(chalk.green("Title: " + response.data.Title));
            display(chalk.green("Release Year: " + response.data.Year));
            display(chalk.green("IMDB Rating: " + response.data.imdbRating));
            display(chalk.green("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value));
            display(chalk.green("Country: " + response.data.Country));
            display(chalk.green("Language: " + response.data.Language));
            display(chalk.green("Plot: " + response.data.Plot));
            display(chalk.green("Actors: " + response.data.Actors));
            display(chalk.blue("\n---------------------------------------------------\n"));
        // }
    });
};

//DO WHAT RANDOM.TXT SAYS

function getRandom() {


    fs.readFile('random.txt', "utf8", function (error, data) {

        if (error) {
            return display(error);
        }


       let dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {

           let songcheck = dataArr[1].trim().slice(1, -1);
            spotifySong(songcheck);
        }

    });

};

//SEND TO LOG.TXT

function display(dataToLog) {

    console.log(dataToLog);

    fs.appendFile('log.txt', dataToLog + '\n', function (err) {

        if (err) return display('Error logging data to file: ' + err);
    });
}


switchCase();
