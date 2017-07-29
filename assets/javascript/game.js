// Javascript and jquery for crystal collector

$(document).ready(function() {

// Perform initialize tasks
// Variables

var ourHero = "";
var ourEnemy = "";
var heroNeeded = true;


//runs initial clean during doc ready
loadFunction();


//**********   functions

function loadFunction() {

  userTotal = 0;
  $(".userTotal").html(userTotal);
  // Store the crystal random number in the data element

  //get the random number to be matched
  randomMatchNo  = (Math.floor(Math.random() * 102) + 19);
  $(".computerNo").html(randomMatchNo);

}  //**********  end of loadfunction

 //  when user clicks on row of players 
 $(".imgChar").on("click", function() {

    console.log("clicked")
    if (heroNeeded) {

      ourHero = $(this).attr("id");
      $("#" + ourHero + "Box").addClass("hide");
      $("#" + ourHero + "Box").clone().appendTo(".heroBox").removeClass("hide");
      heroNeeded = false;

    } else {

      ourEnemy = $(this).attr("id");
      $("#" + ourEnemy + "Box").addClass("hide");
      $("#" + ourEnemy + "Box").clone().appendTo(".enemyBox").removeClass("hide");
    
    }

  }) //********** end of crystal click 

  // click on an image, increase the user total, compare to random 
  $(".imgCrystal").on("click", function() {

    userTotal = userTotal + $(this).data("crystalRandomNo");

    $(".userTotal").html(userTotal);

    if (userTotal === randomMatchNo) {   //winner
      totalWins++;
      $(".totalWins").html(totalWins);
      loadFunction();
    } else if (userTotal > randomMatchNo)  {  //loser
      totalLosses++;
      $(".totalLosses").html(totalLosses);
      loadFunction();
    }
  }) //********** end of crystal click 

})  //********** end of document ready