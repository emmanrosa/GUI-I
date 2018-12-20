/*
  Name:Emmanuel Rosario
  Email: Emmanuel_Rosario@student.uml.edu
  Affiliation: Student at UMass Lowell in course 91.61 GUI Programming I
  Date: December 9, 2018
  Assignment No.9
  Description: 
   For this assignment we were task to create a bit of scrabble game.The user then drags tiles to 
 the board to make a word, and you are to report his or her score, taking the letter values and 
 bonus squares into consideration.
  sources:
  for the tiles images
  https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.html
  for the double lettle score image
  https://d1b10bmlvqabco.cloudfront.net/attach/icm9jynacvn5kx/i5ic1b2hwmz6nv/ihf34c9jbxpw/Scrabble_Board_OneLine.png
  for the rack image
  https://cdn.pixabay.com/photo/2014/07/31/20/48/scrabble-tile-holder-406774_640.png  
  Dictionary Lookups in JavaScript
  https://johnresig.com/blog/dictionary-lookups-in-javascript/
  
*/

$(document).ready( function() {
    loadgames();
});
// level
var level = 1;
// Global variables
var num_of_tiles = 7;
// at first the game board is set 0  and keeps track of the user score
var scores = [0, 0, 0, 0, 0, 0, 0];
// keep track of the score
var totalscore= 0
// keep track of the words used
var userwords = []; 
// I edited ScrabbleTiles array that I got from Professor Heines
var ScrabbleTiles = [
{"Tile":"A", "value" : 1, "number-remaining" : 9  },
{"Tile":"B",  "value" : 3, "number-remaining" : 2  },
{"Tile":"C",  "value" : 3, "number-remaining" : 2  },
{"Tile":"D",  "value" : 2, "number-remaining" : 4  },
{"Tile":"E",  "value" : 1, "number-remaining" : 12 },
{"Tile":"F",  "value" : 4, "number-remaining" : 2  },
{"Tile":"G",  "value" : 2, "number-remaining" : 3  },
{"Tile":"H",  "value" : 4, "number-remaining" : 2  },
{"Tile":"I",  "value" : 1, "number-remaining" : 9  },
{"Tile":"J",  "value" : 8, "number-remaining" : 1  },
{"Tile":"K",  "value" : 5, "number-remaining" : 1  },
{"Tile":"L",  "value" : 1, "number-remaining" : 4  },
{"Tile":"M",  "value" : 3, "number-remaining" : 2  },
{"Tile":"N",  "value" : 1, "number-remaining" : 6  },
{"Tile":"O",  "value" : 1, "number-remaining" : 8  },
{"Tile":"P",  "value" : 3, "number-remaining" : 2  },
{"Tile":"Q",  "value" : 10,"number-remaining" : 1  },
{"Tile":"R",  "value" : 1, "number-remaining" : 6  },
{"Tile":"S",  "value" : 1, "number-remaining" : 4  },
{"Tile":"T",  "value" : 1, "number-remaining" : 6  },
{"Tile":"U",  "value" : 1, "number-remaining" : 4  },
{"Tile":"V",  "value" : 4, "number-remaining" : 2  },
{"Tile":"W",  "value" : 4, "number-remaining" : 2  },
{"Tile":"X",  "value" : 8, "number-remaining" : 1  },
{"Tile":"Y",  "value" : 4, "number-remaining" : 2  },
{"Tile":"Z",  "value" : 10,"number-remaining" : 1  },
{"Tile":"Blank",  "value" : 0, "number-remaining" : 2  },
];

/*  
    https://stackoverflow.com/questions/20392782/a-list-of-tuples-in-javascript
    extract the word, value and freq from ScrabbleTiles array using map
*/
var Tiles_List = ScrabbleTiles.map(function(item) {
    return {
        words: item.Tile,
        values: item.value,
        freq: item["number-remaining"]

      };
});

// this function returns two numbers 
var randomspot = function() {
    var first = Math.floor(Math.random() * (num_of_tiles - 1));
    var second = Math.floor(Math.random() * (num_of_tiles - 1));
    // checks that the two number are not the same
    if(first === second) return loadgames(); 
    // else return the two numbers
    return{
        first: first,
        second: second
    }
}

function loadgames(){
    //var lev = 
    $("#level").html("Level " +level++); 
    var randspot = randomspot();  // generate two randoms numbers by calling the function randomspot()
    //score = 0;
    for(var i = 0; i < num_of_tiles; i++) {
        var bonus = ""; 
        var letter = generaterandomletter();
        $('#tiles').prepend('<img class="letter" id="' + letter + '" src="images/Scrabble_Tiles/Scrabble_Tile_' + letter + '.jpg" />');
        $('#' + letter).draggable({ snap: "#board img" });
        
        // if i equal to the spots assign the bonus spots 
        if(i === randspot.first || i === randspot.second) bonus = "Bonus";
        // create the seven board spots
        $('#board').append('<img value=' + i + ' id="droppable' + i + '" bonus=' + (bonus === "Bonus" ? 2 : 1) + ' src="images/Scrabble_Tiles/ScrabbleBoard' + bonus + '.jpg" alt="Tile">');
        $("#droppable" + i).droppable({
          // greedy: false,
            //revert: true,
            //$(this){sortable()},
            tolerance: "fit",
            //revert: 'invalid',
            drop: function( event, ui ) {

                scores[$(this).attr('value')] = $(this).attr('bonus') * getlettervalue($(ui.draggable).attr('id'));
                // calls the function getaddword()
                getaddword($(ui.draggable).attr('id'),$(this).attr('value'));
                totalscore += scores[$(this).attr('value')];
                // calls the function getscore()
                getscore();

            },
            out: function( event, ui ) {
                
                scores[$(this).attr('value')] = 0;
                totalscore -= $(this).attr('bonus') * getlettervalue($(ui.draggable).attr('id'));
                if(totalscore < 0) totalscore = 0;
                // calls the function getscore() to change the score based on tile been remove
                getscore();
                // calls the function getremoveword() to change the order and the word removed by the user
                getremoveword($(this).attr('value'));
            }
          });
          
          
    }  

}

/*
JavaScript random() Method
https://www.w3schools.com/jsref/jsref_random.asp
https://codereview.stackexchange.com/questions/162558/generate-random-letter-by-frequency/162563
This function general random letter
*/
function generaterandomletter() {
    var Freq = [];
    Freq[0] = Tiles_List[0].freq;
    for(var i = 1; i < ScrabbleTiles.length; i++) {
      Freq[i] = Tiles_List[i].freq + Freq[i - 1];
    }
    var val = Math.floor(Math.random() * Freq[ScrabbleTiles.length - 1]);
    for(var i = 0; i < ScrabbleTiles.length; i++) {
      if(val < Freq[i]) {
        Tiles_List[i].freq  = Tiles_List[i].freq - 1;
        return Tiles_List[i].words; // return a letter
      }
    }
}

// This function gets the word(letter) value
function getlettervalue(letter) {
    for(var i = 0; i < ScrabbleTiles.length; i++) {
      if(Tiles_List[i].words === letter) return Tiles_List[i].values;
    }
    return -1;
}

// This function keeps track words being add to board by the user
function getaddword(letter,pos) {
    userwords.splice(pos,0,letter);
    $("#word").html(userwords);
}

// This function keeps track of the word removed by the user
function getremoveword(pos) {
    //userwords.splice(pos,1);
    delete userwords[pos];
    $("#word").html(userwords);
}

// This function keeps track of the user score 
function getscore() {
   $("#score").html(totalscore); // show the update score
}

// The dictionary lookup object
var dict = {};
 
// Do a jQuery Ajax request for the text dictionary
$.get( "dictionary/words.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
       // dict&#91; words&#91;i&#93; &#93; = true;
       dict[words[i]] = true;
    }

});

/*
    function diclookup() gets call when the user click on bottom check.
    allows the user to check if the word is in the dictionary.
*/
function diclookup(){
    var newword = userwords.join('');
    //newword = newword.toLowerCase();
    if(newword.length <= 2){
        $("#info").html("Please try to complete the board.");
    }
    while(newword.length >= 2){
    if(dict[newword]){
        //
        
        $("#info").html(newword + " is considered a word by the dictionary");
        return true;
    } else {
        $("#info").html(newword + " is not considered a word by the dictionary");
        return false;
    }
    }
}

/*
    function reset() gets call when the user click on bottom reset.
    allows the user to reset the current level if the don't like the 
    given game tiles.
*/
function reset(){
   //location.reload();
   if (confirm('Are you sure you want reset the tiles?')) {
    level -=1;
    if(level <= 0) level = 1;
    $('#board').empty();
    $("#droppable").empty();
    $('#tiles').empty();
    $("#info").html("");
    $("#word").html("");
    userwords = [];
    
    loadgames();
    } else {
        return;
    }//
}

/*
    function next() gets call when the user click on bottom next.
    in order for the user to pass the current level they need to comple
    a word.
*/
function next(){
    if(diclookup()){
        $('#board').empty();
        $("#droppable").empty();
        $('#tiles').empty();
        userwords = []; 
        $("#info").html("");
        $("#word").html("");
        loadgames();
        
        return;
    } else {
        $("#info").html("You need to finish this game first");
        return -1;
    }

}