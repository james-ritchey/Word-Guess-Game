var game = {
    wordList: ["Doom", "Quake", "Skyrim"],
    word: "filler",
    wordPick: -1,
    hiddenWord: "",
    guesses: 12,
    wins: 0,
    guessList: [],
    currentWord: document.getElementById("currentWord"),
    numOfGuesses: document.getElementById("numOfGuesses"),
    numOfWins: document.getElementById("numOfWins"),
    guessedLetters: document.getElementById("guessedLetters"),

    startGame: function() {
        //Initialize the game and the text elements on the page
        this.wordPick = Math.floor(Math.random() * this.wordList.length);
        this.word = this.wordList[this.wordPick];
        for(var i = 0; i < this.word.length; i++){
            this.hiddenWord = this.hiddenWord + "_";
        }
        this.updateInfo();
    },

    newWord: function() {
        //Use random number to select a new word and remove the previous word
        this.wordList.splice(this.wordPick, 1);
        if(this.wordList.length < 1){this.winGame()};
        for(var i = 0; i < this.word.length; i++){
            hiddenWord = this.hiddenWord + "_";
        };
    },

    guessLetter: function(key) {
        //Check the users guess on the already guessed letters as well as the current word
        if("abcdefghijklmnopqrstuvwxyz".includes(key) && !(this.guessList.includes(key))){
            this.guessList.push(key);
            this.guesses--;
            this.updateInfo();
        }
        else {
            //Do nothing
        }
    },

    updateInfo: function() {
        //Update info displayed on the screen
        currentWord.textContent = this.hiddenWord;
        numOfGuesses.textContent = this.guesses;
        numOfWins.textContent = this.wins;
        guessedLetters.textContent = this.guessList;
    },

    winGame: function() {
        //End the game as all words have been guessed
    }

    loseGame: function() {
        //End the game as all guesses have been used before finding the word
    }
}

game.startGame();

document.onkeyup = function(event) {
    game.guessLetter(event.key);
}