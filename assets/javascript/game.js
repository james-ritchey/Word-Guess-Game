//Game Objects containing the related name, image source, and sound source
var fallout = {
    name: "Fallout",
    image: "assets/images/fallout.jpg",
    sound: "assets/sounds/fallout.mp3"
}

var mkart = {
    name: "Mario Kart",
    image: "assets/images/mkart.jpg",
    sound: "assets/sounds/mkart.mp3"
}

var halflife = {
    name: "Half-Life",
    image: "assets/images/halflife.jpg",
    sound: "assets/sounds/halflife.mp3"
}

var bkazoo = {
    name: "Banjo-Kazooie",
    image: "assets/images/bkazoo.jpg",
    sound: "assets/sounds/bkazoo.mp3"
}

var smarioworld = {
    name: "Super Mario World",
    image: "assets/images/smworld.jpg",
    sound: "assets/sounds/smworld.mp3"
}

var geye = {
    name: "Goldeneye",
    image: "assets/images/geye.jpg",
    sound: "assets/sounds/geye.mp3"
}

var bandicoot = {
    name: "Crash Bandicoot",
    image: "assets/images/bandicoot.jpg",
    sound: "assets/sounds/bandicoot.mp3"
}

var doom = {
    name: "DOOM",
    image: "assets/images/doom.jpg",
    sound: "assets/sounds/doom.mp3"
}

var rct = {
    name: "Rollercoaster Tycoon",
    image: "assets/images/rct.jpg",
    sound: "assets/sounds/rct.mp3"
}

var mkombat = {
    name: "Mortal Kombat",
    image: "assets/images/mkombat.jpg",
    sound: "assets/sounds/mkombat.mp3"
}
//Main Game Manager Object, handles the game's functions
var game = {
    //Global Game Variables
    /*True if the game is started*/
    started: false,
    /*True if game is in progress*/
    inProgress: false,
    /*Array of Game Objects used in the game*/
    wordList: [fallout, mkart, halflife, bkazoo, smarioworld, geye, bandicoot, doom, rct, mkombat],
    /*Array used to reset the 'wordList' array*/
    wordListReset: [fallout, mkart, halflife, bkazoo, smarioworld, geye, bandicoot, doom, rct, mkombat],
    /*String word the user is attempting to guess*/
    word: "filler",
    /*Position on the 'wordList' array to grab a Game Object, will be randomly generated*/
    wordPick: -1,
    /*The currently selected Game Object, chosen randomly from 'wordList'*/
    wordObject: fallout,
    /*The string of underscores, spaces, and hyphens used in place of the target word*/
    hiddenWord: "",
    /*The minimum amount of guesses*/
    minGuesses: 12,
    /*The number of guesses the user can take, will be adjusted depending on the word length*/
    guesses: this.minGuesses,
    /*Number of wins the user has accrued, increases when the target word is guessed*/
    wins: 0,
    /*Array of letters the user has guessed*/
    guessList: [],
    /*The HTML element of the currently hidden word*/
    currentWord: document.getElementById("currentWord"),
    /*The HTML element of the number of guesses the user has*/
    numOfGuesses: document.getElementById("numOfGuesses"),
    /*The HTML element of the number of wins the user has*/
    numOfWins: document.getElementById("numOfWins"),
    /*The HTML element of the letters guessed by the user*/
    guessedLetters: document.getElementById("guessedLetters"),
    /*The HTML element of the image revealed when the user guesses a word*/
    image: document.getElementById("image"),
    /*The HTML element of the previously guessed word, displayed under the image*/
    oldWord: document.getElementById("old-word"),
    /**
     * Initializes the game as well as the text elements on the page,
     * randomly generating a position on the array, setting the 
     * values of the target word to the chosen object's name,
     * as well as setting the number of guesses and then calling
     * to update the information displayed on the page.
     */
    startGame: function() {
        this.wordPick = Math.floor(Math.random() * this.wordList.length);
        this.wordObject = this.wordList[this.wordPick];
        this.word = this.wordObject.name.toLowerCase();
        for(var i = 0; i < this.word.length; i++){
            if("- ".includes(this.word.charAt(i))){
                this.hiddenWord = this.hiddenWord + this.word.charAt(i);
            }
            else{
                this.hiddenWord = this.hiddenWord + "_";
            }
        }
        this.guesses = this.word.length + 2;
        if(this.guesses < this.minGuesses) {this.guesses = this.minGuesses};
        this.started = true;
        this.inProgress = true;
        document.getElementById("hidden-word").style.display = "block";
        document.getElementById("start-button").style.display = "none";
        this.updateInfo();
    },
    /**
     * Similar to the 'startGame' function, a random position is 
     * chosen on the array and the object's values are used, but 
     * before choosing a new object, the previous object is removed
     * from the array.  The function also checks to see if there are
     * any words left to guess, then calculates the number
     * of guesses and calls to update the information on the page.
     */
    newWord: function() {
        this.hiddenWord = "";
        this.wordList.splice(this.wordPick, 1);
        if(this.wordList.length < 1) {
            this.endGame()
        }
        else{
            console.log(this.wordList);
            this.wordPick = Math.floor(Math.random() * this.wordList.length);
            this.wordObject = this.wordList[this.wordPick];
            this.word = this.wordObject.name.toLowerCase();
            for(var i = 0; i < this.word.length; i++){
                if("- ".includes(this.word.charAt(i))){
                    this.hiddenWord = this.hiddenWord + this.word.charAt(i);
                }
                else{
                    this.hiddenWord = this.hiddenWord + "_";
                }
            };
        };
        this.guessList = [];
        this.guesses = this.word.length;
        if(this.guesses < this.minGuesses) {this.guesses = this.minGuesses};
        this.updateInfo();
    },
    /**
     * Takes the key pressed by the user and checks to see
     * if it's a letter, and if it is a letter, if it has
     * been guessed already this round.  The function then
     * updates the string of underscores displaying the 
     * hidden word if the letter is 
     * @param {*} key The key pressed by the user
     */
    guessLetter: function(key) {
        if("abcdefghijklmnopqrstuvwxyz".includes(key) && !(this.guessList.includes(key))){
            if(this.word.includes(key)){
                var tempString = "";
                for(var i = 0; i < this.word.length; i++) {
                    if(this.word.charAt(i) == key) {
                        tempString = "" + tempString + key;
                    }
                    else {
                        tempString = tempString + this.hiddenWord.charAt(i);
                    }
                }
                this.hiddenWord = tempString;
            }
            this.guessList.push(key);
            this.guesses--;
            if(this.guesses == 0) {this.loseGame()};
            if(this.hiddenWord == this.word) {this.winGame()};
            this.updateInfo();
        }
        else {
            //Do nothing
        }
    },
    /**
     * Updates the game info on the displayed page
     */
    updateInfo: function() {
        //Update info displayed on the screen
        currentWord.textContent = this.hiddenWord;
        numOfGuesses.textContent = this.guesses;
        numOfWins.textContent = this.wins;
        guessedLetters.textContent = this.guessList;
    },
    /**
     * Resets the wordList array as well as the other game
     * variables, and restarts the game.
     */
    reset: function() {
        for(var i = 0; i < this.wordListReset.length; i++){ this.wordList.push(this.wordListReset[i])}
        this.numOfGuesses = 12;
        this.numOfWins = 0;
        this.guessList = [];
        this.updateInfo();
        document.getElementById("retry-button").style.display = "none";
        document.getElementById("hidden-word").style.display = "inline";
        this.startGame();
    },
    /**
     * Changes the image source and playing sound to match the guessed word,
     * then calls for a new word to be chose and increases the number of wins.
     */
    winGame: function() {
        this.image.src = this.wordObject.image;
        this.oldWord.textContent = this.wordObject.name;
        var tempAudio = new Audio(this.wordObject.sound);
        this.audio.pause();
        this.audio = tempAudio;
        this.audio.play();
        this.newWord();
        this.wins++;
        this.updateInfo();
    },
    /**
     * Calls for a new word to be chosen when the player doesn't 
     * guess the word.
     */
    loseGame: function() {
        this.newWord();
    },
    /**
     * Ends the game after all words are guessed and asks the user if they'd like
     * to retry.
     */
    endGame: function() {
        this.inProgress = false;
        document.getElementById("hidden-word").style.display = "none";
        document.getElementById("retry-button").style.display = "inline";
    }
}
/**
 * Gets the user's keystroke and sends it to the 'game.guesLetter()' function if
 * the game has been started.
 */
document.onkeyup = function(event) {
    if(game.inProgress){
        game.guessLetter(event.key);
    }
}
/**
 * Starts the game
 */
document.getElementById("start-button").onclick = function() {
    game.startGame();
}
/**
 * Restarts the game
 */
document.getElementById("retry-button").onclick = function() {
    game.reset();
}
/**
 * Gets the input from the text field used to get player 
 * input on mobile devices.
 */
document.getElementById("mobile-keyboard").oninput = function() {
    if(game.inProgress){
        var mkb = document.getElementById("mobile-keyboard");
        var guess = mkb.value.charAt(mkb.length - 1).toLowerCase();
        game.guessLetter(guess);
    }
    console.log(guess);
    document.getElementById("mobile-keyboard").value = "";
}