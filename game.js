let gamePattern = [];
let userClickedPattern = [];
const buttonColor=["red","blue","yellow","green"];
var level = 0; 
let currentLevel = 0;
var gameStarted = false;


function nextSequence (){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
    level++;
    $('#level-title').text('level ' + level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass('pressed');
    setTimeout ( function (){
        $("." + currentColor).removeClass('pressed');
    }, 100); 
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    currentLevel = 0 ;
}

function wrongAnswer(){
    var audio = new Audio('sounds/wrong.mp3');
    audio.play;
    $('body').addClass('game-over');
    setTimeout(function (){
        $('body').removeClass('game-over');
    },200);
    $('#level-title').text("Game Over, Press Any Key to Restart");
    gameStarted = false;
}

function checkAnswer(lev){
    if(currentLevel+1==lev){
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            setTimeout(function (){
                userClickedPattern = [];
                nextSequence()
                currentLevel=0;},500);
        }
        else {
            wrongAnswer();
        }
    }
    else if (currentLevel +1 < lev){
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            currentLevel++;
        }
        else {
            wrongAnswer();
        }
    }
}



$(".btn").on('click',function (){
    if(gameStarted === true){
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level);
    }
});

$("body").on('keydown',function (){
    if(gameStarted === false){
        startOver();
        setTimeout(nextSequence(),2000);
        gameStarted = true;
    }
});