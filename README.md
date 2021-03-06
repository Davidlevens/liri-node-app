<h1>LIRI Node App</h1>


<hr>

Author:  David Levens

Inspiration Credit: Michael Benefiel, Craig W.-Thank You!

<hr>

<h3> App demo </h3>

![alt text](./images/liri-terminal.png "Liri Node App")

<hr>

![alt text](./images/liri-bot4.png "Liri Node App")

<hr>

<h2> Project overview</h2>
LIRI is a command line Node app that takes in parameters and returns data from the following APIs: Bandsintown, Spotify and OMDb.
<hr>

<h2> How it works </h2>
Type into the command line....

- ```node liri.js concert-this "artist/band name here"``` to return concert information from Bandsintown. 

- ```node liri.js spotify-this-song "song name here"``` to return song information from Spotify. If no song is entered, a hard coded default song will return.
  
- ```node liri.js movie-this "movie name here"``` to return movie information from OMDb. If no movie is entered, a hard coded default movie will return.
  
- ```node liri.js do-what-it-says``` to return information stored in random.txt

- ```node liri.js <no command>``` to return switch/case default: "Invalid. Does not compute. Self-destructing in 3..2..1.."
<hr>

<h2>Technology and packages used</h2>

[Node.js](https://nodejs.org/en/)

[chalk](https://www.npmjs.com/package/chalk)

[figlet](https://www.npmjs.com/package/figlet)

[fs](https://www.npmjs.com/package/fs)

[request](https://www.npmjs.com/package/request)

[axios](https://www.npmjs.com/package/axios)

[moment](https://www.npmjs.com/package/moment)

[Bandsintown API](http://www.artists.bandsintown.com/bandsintown-api)

[OMDb API](http://www.omdbapi.com/)

[Spotify API](https://developer.spotify.com/documentation/web-api/)

<hr></hr>

<h4>Below is a thorough, but not comprehensive, step-by-step process of how I got the app running in terms of code</h4>

- Navigate to root of project. Initialize package.json by running ```npm init -y```

- Creation of .gitignore file

- Creation of keys.js
  - Spotify keys for export

- Creation of .env file to store Spotify API keys

- Creation of random.txt with default result for do-what-it-says command

- Creation of liri.js 

- ```npm install dotenv```

- ```npm install fs```

- ```npm install request```

- ```npm install axios```

- ```npm install figlet```

- ```npm install node-spotify-api```

- ```npm install chalk``` 

- declare command line variables (command, parameter)

- switchCase(); switch statement holding:
  - bandsInTown(parameter);
  - spotifySong(parameter)
  - omdbInfo(parameter);
  - getRandom(parameter);
  - display(parameter);

- bandsInTown();
  - declare artist variable as parameter
  - figlet "Bandsintown" for style
  - Send request for concerts to Bandsintown API based off "artist" entered into parameter
  - parse data into readable object
  - return name, city, country and date of concerts
  - Chalk package used for style

- spotifySong();
  - declare searchTrack variable as parameter
  - set undefined parameter
      - return Ace of Base The Sign if no track entered into parameter
  - figlet "Spotify" for style
  - search Spotify API and return artist, song, url preview and album name of song entered in parameter
  - Chalk package used for style

- ombdInfo();
  - set findMovie variable as parameter
  - set undefined parameter
    - return "Mr. Nobody" if no parameter entered
  - figlet "OMDB" for style
  - Retrieve movie data from OMDb API and return title, release year, IMDB rating, Rotten Tomatoes rating, country, language, plot and actors
  - Chalk package used for style

- getRandom();
  - read and return information in random.txt by utilizing if statement

- display();
  - append information to log.txt

- call switchCase();

