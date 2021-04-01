console.log("airtable demo");

var Airtable = require('airtable');
console.log(Airtable);

//connect to our base using API key 
var base = new Airtable({apiKey: 'keyO9wq4XLHM7yf9d'}).base('appiyGh8osnYsieKq');



//get our collection base, select all the records 
//specify functions that will recieve the data
base('music').select({}).eachPage(gotPageOfMusics, gotAllMusics);
    // This function (`page`) will get called for each page of records.


// an empty array to hold our data
var musics = [];


// callback function that receives our data
function gotPageOfMusics(records, fetchNextPage) {
    console.log("gotPageOfMusics()");
    // add the records from this page to our rocks array
    musics.push(...records);
    // request more pages
    fetchNextPage();
  }

//call back function that is called when all pages are loaded
function gotAllMusics(err) {
    console.log("gotAllMusics()");

    //report an error
    if (err) {
        console.log("error loading musics");
        console.error(err);
        return;
    }
        //call function to log and show the music 
        consoleLogMusics();
        showMusics();
}


// just loop through the books and console.log them
function consoleLogMusics() {
    console.log("consoleLogMusics()");
    musics.forEach(music => {
      console.log("Music:", music);
    });
  }


//look through airtable, create elements
function showMusics() {
    console.log("showMusics()");
    musics.forEach((music) => {
  
        var musicTitle = document.createElement("h1");
        musicTitle.innerText = music.fields.album_title;
        document.body.append(musicTitle);

        var nameOfArtist = document.createElement("p");
        nameOfArtist.innerText = music.fields.artist;
        document.body.append(nameOfArtist);

        var albumArt = document.createElement("img");
        albumArt.src = music.fields.album_artwork[0].url;
        document.querySelector(".container").append(albumArt);
    });



}

