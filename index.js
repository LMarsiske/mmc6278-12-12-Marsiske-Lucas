const words = [
  "bananas",
  "grapes",
  "carousel",
  "milkshake",
  "javascript",
  "limousine",
  "chocolate",
  "programming",
  "meatloaf",
  "ukulele",
  "mango",
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (this.incorrectLetters.includes(letter) || !this.isAlpha(letter)) {
      return;
    }

    if (this.word.includes(letter)) {
      console.log("word contains letter");
      this.correctLetters.push(letter);
      let matchingIndexes = [];
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          matchingIndexes.push(i);
        }
      }
      matchingIndexes.forEach((idx) => {
        this.displayWord = `${this.displayWord.substring(
          0,
          idx
        )}${letter}${this.displayWord.substring(idx + 1)}`;
      });
    } else {
      console.log("word does not contain letter");
      this.incorrectLetters.push(letter);
      this.remainingGuesses--;
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    const wordDisplay = document.getElementById("word-to-guess");
    const remainingGuessesDisplay =
      document.getElementById("remaining-guesses");
    const incorrectLettersDisplay =
      document.getElementById("incorrect-letters");
    wordDisplay.textContent = this.displayWord;
    remainingGuessesDisplay.textContent = this.remainingGuesses;
    incorrectLettersDisplay.textContent = this.incorrectLetters;
  }

  // implement the isGameOver function:
  isGameOver() {
    if (this.displayWord !== this.word && this.remainingGuesses > 0) {
      return false;
    }
    return true;
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.displayWord !== this.word && this.remainingGuesses > 0) {
      return null;
    }

    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return "win";
    }

    if (this.remainingGuesses <= 0 && this.displayWord !== this.word) {
      return "loss";
    }
  }

  isAlpha(char) {
    return /^[a-z]$/i.test(char);
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
  currentWord = new Word(randomWord);
  currentWord.updateScreen();
}

document.onkeyup = function (e) {
  const pressedKey = e.key.toLowerCase();
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return;

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey);
  // allow word obj to update screen
  currentWord.updateScreen();

  // check if game is over
  const gameOver = currentWord.isGameOver();

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById("previous-word");
    const winDisplay = document.getElementById("wins");
    const lossDisplay = document.getElementById("losses");
    previousWord.textContent = currentWord.word;
    const result = currentWord.getWinOrLoss();
    if (result === "win") {
      wins++;
      winDisplay.textContent = wins;
    } else if (result === "loss") {
      losses++;
      lossDisplay.textContent = losses;
    }
    newGame();
  }
};

newGame();
