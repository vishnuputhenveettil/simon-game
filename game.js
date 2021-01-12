gamePattern=[];
userClickedPattern=[];
var started;
var h1=0;
var buttonColours=["red","green","yellow","blue",];

$(".btn").click(function()
{
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var len=userClickedPattern.length-1;
  //console.log(len);
  checkAnswer(len);

});

function nextSequence()
{
  userClickedPattern=[];
  h1++;
  $("#level-title").text("level "+h1);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var id="#"+randomChosenColour;
  $(id).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour)
}

    function playSound(name)
    {
      var audio=new Audio("sounds/"+name+".mp3");
     //console.log("sounds/"+randomChosenColour+".mp3");
      audio.play();


    }
function animatePress(currentColour)
  {
    console.log(currentColour);
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
   $("#" + currentColour).removeClass("pressed");
 }, 100);

  }
$("body").keydown(function(){

  if(started!=true)
  {
    $("#level-title").text("level "+h1);
    nextSequence();
    started=true;
  }
});
function checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
  //console.log("true");
  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function () {
    nextSequence();
    }, 1000);
  }
}
else
{
  var wr=new Audio("sounds/wrong.mp3");
  wr.play();
  $("body").addClass("game-over");
  setTimeout(function()
{
  $("body").removeClass("game-over");
});
$("#level-title").text("game over press any key to restart");
startOver();
//  console.log("wrong");
}
}
function startOver()
{
  h1=0;
  gamePattern=[];
  started=false;
}
