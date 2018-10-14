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

var game = {
    started: false,
    inProgress: false,
    wordList: [fallout, mkart, halflife, bkazoo, smarioworld, geye, bandicoot, doom, rct, mkombat],
    wordListReset: [fallout, mkart, halflife, bkazoo, smarioworld, geye, bandicoot, doom, rct, mkombat],
    word: "filler",
    wordPick: -1,
    wordObject: fallout,
    hiddenWord: "",
    minGuesses: 12,
    guesses: this.minGuesses,
    wins: 0,
    guessList: [],
    currentWord: document.getElementById("currentWord"),
    numOfGuesses: document.getElementById("numOfGuesses"),
    numOfWins: document.getElementById("numOfWins"),
    guessedLetters: document.getElementById("guessedLetters"),
    image: document.getElementById("image"),
    oldWord: document.getElementById("old-word"),
    audio: new Audio(),

    startGame: function() {
        //Initialize the game and the text elements on the page
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

    newWord: function() {
        //Use random number to select a new word and remove the previous word
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
            if(this.hiddenWord == this.word) {this.winGame()};
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

    loseGame: function() {
        this.newWord();
    },

    endGame: function() {
        this.inProgress = false;
        document.getElementById("hidden-word").style.display = "none";
        document.getElementById("retry-button").style.display = "inline";
    }
}

document.onkeyup = function(event) {
    if(game.inProgress){
        game.guessLetter(event.key);
    }
}

document.getElementById("start-button").onclick = function() {
    game.startGame();
}

document.getElementById("retry-button").onclick = function() {
    game.reset();
}

document.getElementById("mobile-keyboard").oninput = function() {
    if(game.inProgress){
        var mkb = document.getElementById("mobile-keyboard");
        var guess = mkb.value.charAt(mkb.length - 1).toLowerCase();
        game.guessLetter(guess);
    }
    console.log(guess);
    document.getElementById("mobile-keyboard").value = "";
}