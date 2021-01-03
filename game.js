var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameOn = false;
var level = 0;

$(document).on("keydown", function(){
  if (!gameOn){
    gameOn = true;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
})

//Add listeners to buttons
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


/***CREATE COLOR RANDOMIZER***/
function nextSequence() {

  level++;
  $("#level-title").text("Level "+level)

  var randomNumber = createRandomNumber(4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//Creates random number between 0 and num(excluding)
function createRandomNumber(num) {
  ranNum = Math.random() * num;
  return Math.floor(ranNum);
}

function playSound(soundName) {
  var sound = new Audio("sounds/" + soundName + ".mp3");
  sound.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentMove){

  if (gamePattern[currentMove] === userClickedPattern[currentMove]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()},1000);
      userClickedPattern = [];
    }
  }else{

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gameOn=false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
