var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var testArray = ["red", "blue", "green", "yellow", "red", "blue", "green", "yellow", "red", "blue", "green", "yellow"]
var level = 0
var gameStart = false

var currentTime = new Date();

//Looks to see if buttons are clicked and sends button id to various functions
$(".btn").click(function (event) {
    var userChosenColor = event.currentTarget.id
    playerClick(userChosenColor)
    userClickedPattern.push(userChosenColor)
})

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

//When the play clicks it will play the corosponding sound and animate the button
function playerClick(color) {
    playColorSound(color);
    animatePress(color);
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
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    console.log(randomChosenColor + " was added to gamePattern")
    level++

    showSequence(gamePattern);
}

//Shows what the current sequence to be copied by player is
function showSequence(currentArray) {
    for (i=0; i < currentArray.length; i++) {

        console.log("This is loop number " + i);
        console.log("The color returned in the array is " + currentArray[i]);
        playColorSound(currentArray[i]);
        animatePress(currentArray[i]);
        
    }
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