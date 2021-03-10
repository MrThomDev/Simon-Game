var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var testArray = ["red", "blue", "green", "yellow", "red", "blue", "green", "yellow", "red", "blue", "green", "yellow"]
var level = 0
var gameStart = false

var currentTime = new Date();


//Looks for a keypress
$(document).keydown(function(event) {
    if (gameStart === false) {
        gameStart = true
        nextSequence();
    }
    else {
        alert("The game has already started")
    }

})

//Looks to see if buttons are clicked and sends button id to various functions
$(".btn").click(function (event) {
    var userChosenColor = event.currentTarget.id
    playerClick(userChosenColor)
    userClickedPattern.push(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

function startOver() {
    gamePattern = []
    userClickedPattern = []
    gameStart = false
    level = 0
}



//When the play clicks it will play the corosponding sound and animate the button
function playerClick(color) {
    playColorSound(color);
    animatePress(color);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = []
                nextSequence();
            }, 1000)
        }
    }

    else {
        console.log("Wrong")
        playColorSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over. Press any Key to restart")
        startOver();
    }
}


function animatePress(currentColor) {
    $("#" + currentColor).removeClass(currentColor)
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
    $("#" + currentColor).animate({opacity: "0%"}, 50).animate({opacity: "100%"}, 50)
    $("#" + currentColor).addClass(currentColor)
}

//Generates the next sequence
function nextSequence() {
    //Chose Random color and add it to the gamePattern array
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    console.log(randomChosenColor + " was added to gamePattern")
    level++
    //Show the user the generated pattern
    setTimeout(function(){
        showSequence(gamePattern);
    }, 200)
}

//Shows what the current sequence to be copied by player is
function showSequence(currentArray) {
    let newColor = currentArray.length - 1
    playColorSound(currentArray[newColor]);
    animatePress(currentArray[newColor]);
}

//The function that evaluates what id has been inputed and plays the corosponding sound
function playColorSound(color) {
        switch(color) {
            case "red":
                var redSound = new Audio("sounds/red.mp3")
                redSound.play();
                console.log("Red Sound Played")
            break;

            case "blue":
                var blueSound= new Audio("sounds/blue.mp3")
                blueSound.play();
                console.log("Blue Sound Played")
            break;

            case "green":
                var greenSound = new Audio("sounds/green.mp3")
                greenSound.play();
                console.log("Green Sound Played");
            break;

            case "yellow":
                var yellowSound = new Audio("sounds/yellow.mp3")
                yellowSound.play();
                console.log("Yellow Sound Played");
            break;

            case "wrong":
                var wrongSound = new Audio("sounds/wrong.mp3")
                wrongSound.play();
                console.log("Wrong Sound Played");
            break;

            default:
                console.log("Something Broke")
        }
    }



    //for (i = 0; i < 100; i++) {
    //    let t = new Date();
    //    x = t.getMilliseconds();
    //    console.log("Iteration # " + i);
    //    console.log("Time is equal to " + x);
    //}