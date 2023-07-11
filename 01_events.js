var ratButton = document.getElementById("rat");
var goatButton = document.getElementById("goat");
var birdButton = document.getElementById("bird");
var dogButton = document.getElementById("dog");

var outputTarget = document.getElementById("output");

console.log("What is ratButton?", ratButton);

outputTarget.innerText = "JavaScript loaded!\n";

var clickHandler = function (clickEvent) {
    console.log("What is clickEvent?", clickEvent);
    var whatGotClicked = clickEvent.target.innerText;
    console.log("What got clicked?", whatGotClicked);
    // The += appends the new log to the end
    outputTarget.innerText += (whatGotClicked + " got clicked!\n");
};

ratButton.addEventListener("click", clickHandler);
goatButton.addEventListener("click", clickHandler);
birdButton.addEventListener("click", clickHandler);
dogButton.addEventListener("click", clickHandler);

//
//