var game = {
    started: false,
    inProgress: false,
    wordList: ["doom", "fallout", "half-life", "mario kart", "banjo-kazooie", "donkey kong country", "goldeneye", "super mario world"],
    wordListReset: this.wordList,
    word: "filler",
    wordPick: -1,
    hiddenWord: "",
    minGuesses: 12,
    guesses: this.minGuesses,
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
        this.updateInfo();
    },

    newWord: function() {
        //Use random number to select a new word and remove the previous word
        this.hiddenWord = "";
        this.wordList.splice(this.wordPick, 1);
        if(this.wordList.length < 1) {
            this.winGame()
        }
        else{
            console.log(this.wordList);
            this.wordPick = Math.floor(Math.random() * this.wordList.length);
            this.word = this.wordList[this.wordPick];
            for(var i = 0; i < this.word.length; i++){
                if("- ".includes(this.word.charAt(i))){
                    this.hiddenWord = this.hiddenWord + this.word.charAt(i);
                }
                else{
                    this.hiddenWord = this.hiddenWord + "_";
                }
            };
        };
        this.wins++;
        this.guessList = [];
        this.guesses = this.word.length + 2;
        if(this.guesses < this.minGuesses) {this.guesses = this.minGuesses};
        this.updateInfo();
    },

    guessLetter: function(key) {
        //Check the users guess on the already guessed letters as well as the current word
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
            if(this.hiddenWord == this.word) {this.newWord()};
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
        this.hiddenWord = "WINNER!";
        this.inProgress = false;
        this.updateInfo();
        console.log("Woah wow we won owwo");
    },

    loseGame: function() {
        this.inProgress = false;
        console.log("Game lost whoopps shrug");
    }
}

document.onkeyup = function(event) {
    if(!(game.started)){
        game.startGame();
    }    
    else if(game.inProgress){
        game.guessLetter(event.key);
    }
}