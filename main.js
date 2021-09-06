const wordList = [
    "car",
    "laptop",
    "house",
    "mouse",
    "mountain",
    "city",
    "village",
    "books",
    "cat",
    "hotel",
    "telephone",
    "window",
    "zebra",
    "pancakes",
    "cheese",
    "stranger",
    "machine",
    "jellyfish",
    "alarm",
    "level",
    "spoon",
    "minute"
];

const inputText = document.getElementById("inputText");
const submitButton = document.getElementById("submitBtn");
const wordDiv = document.getElementById("wordDiv");
const restartBtn = document.getElementById("restartBtn");
let spanMsg = document.getElementById("attemptSpan");
let smallText = document.getElementById("smallText");
let wrongLetter = true;
let counter = 5;
let guessLetters;

let randomWord = function () {
    let randomNumber = Math.floor(Math.random() * wordList.length);
    return wordList[randomNumber];
}();

addEventListener("load", () => {
    for (let i = 0; i < randomWord.length; i++) {
        let letterDiv = document.createElement("span");
        letterDiv.classList.add("letterDiv")
        letterDiv.innerText = "_";
        wordDiv.appendChild(letterDiv);
        spanMsg.innerHTML = counter;
    }
    guessLetters = randomWord.length;
});

submitButton.addEventListener("click", () => {
    if (inputText.value === ""){
        smallText.innerHTML = "Input cannot be empty!"
    }
    else if(inputText.value.length > 1){
        if(inputText.value.toLowerCase() === randomWord){
            for (let i = 0; i < inputText.value.length; i++) {
                wordDiv.childNodes[i].innerText = inputText.value[i].toUpperCase();     
            }
            finish();
        }
        else{
            smallText.innerHTML = "Wrong"
            wrongAttempt();
            if(counter == 0){
                finish();
            }
        }
        inputText.value = "";
    }
    else {
        wrongLetter = true;
        for (let i = 0; i < randomWord.length; i++) {
            if (inputText.value.toLowerCase() === randomWord[i]) {
                wrongLetter = false;
                wordDiv.childNodes[i].innerText = inputText.value.toUpperCase();
                guessLetters -= 1;
            }
        }
        if(guessLetters == 0){
            finish();
        }
        inputText.value = "";
        if (wrongLetter) {
            wrongAttempt();            
            if(counter == 0){
                finish();
            }
        }
    }
});

function finish(){
    inputText.disabled = true;
    submitButton.disabled = true;
    restartBtn.style.display = "block";
    if(counter > 0){
        restartBtn.innerHTML = "You won!";
        restartBtn.style.backgroundColor = "#4CAF50";
        restartBtn.style.border = "2px solid #4CAF50";
        
    }
    else{
        restartBtn.innerHTML = "Try Again!";
        restartBtn.style.backgroundColor = "#f44336";
        restartBtn.style.border = "2px solid #f44336";
    }
}

function wrongAttempt(){
    counter -= 1;
    spanMsg.innerHTML = counter;
}

restartBtn.addEventListener("click", () => {
    location.reload();
});

