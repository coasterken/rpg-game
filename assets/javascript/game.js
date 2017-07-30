// Javascript and jquery for crystal collector

$(document).ready(function() {

// Perform initialize tasks
// Variables

var ourHero = "";
var ourEnemy = "";
var heroNeeded = true;
var readyForAttack = false;
var heroHealthPoints = 0;
var heroAttackPower = 0;
var heroAttackPowerGrow = 0;
var heroCounterAttackPower = 0
var enemyHealthPoints = 0;
var enemyAttackPower = 0;
var enemyCounterAttackPower = 0;
var remainingCharacters = 0;

var character = {
  leia: {healthPoints: 120,
         attackPower: 10,
         counterAttackPower: 5
        },
  hans: {healthPoints: 100,
         attackPower: 15,
         counterAttackPower: 30
        },        
  jth: {healthPoints: 110,
         attackPower: 5,
         counterAttackPower: 5
        },
  darth: {healthPoints: 80,
         attackPower: 7,
         counterAttackPower: 5
        }
}

//runs initial clean during doc ready
loadFunction();

 //  character selection 
 $(".imgChar").on("click", function() {

    //console.log("clicked")
    if (heroNeeded) {

      ourHero = $(this).attr("id");
      $("#" + ourHero + "Box").addClass("hide");
      $("#" + ourHero + "Box").clone().appendTo(".heroBox").removeClass("hide");
      //$(".heroBox").removeClass("hide");
      $(".mainChar .pictureBox").css({"background-color":"red", "color":"black"});
      $(".instructions").html("Select an Enemy");
      getCharData("hero", ourHero);
      heroNeeded = false;

    } else if (!readyForAttack)  {

      ourEnemy = $(this).attr("id");
      $("#" + ourEnemy + "Box").addClass("hide");
      $("#" + ourEnemy + "Box").clone().appendTo(".enemyBox").removeClass("hide").css({"background-color":"black", "color":"white"});
      $(".enemyBox").removeClass("hide");
      $(".instructions").html("ATTACK!");
      getCharData("enemy", ourEnemy);
      readyForAttack = true;
    }

  }) //********** end of character setup 

 // Attack logic
 $(".attackButton").on("click", function() {

    if (!readyForAttack) {
      return;
    }
    //decrease enemy hp by hero attack power
 
    enemyHealthPoints-= heroAttackPowerGrow;

    //decrease hero hp by enemy attack power
    heroHealthPoints-= enemyCounterAttackPower;

    //update display hero
    $(".heroBox #" + ourHero + "Health").html(heroHealthPoints);

     //update display enemy
    $(".enemyBox #" + ourEnemy + "Health").html(enemyHealthPoints);

    if (heroHealthPoints <= 0) {
      // enemy wins - restart game
        $(".heroMsg").html("You have been defeated...Game Over!!!");
        $(".enemyMsg").html("");
        // $(".heroBox #" + ourHero + "Box").addClass("hide");
        // $(".enemyBox #" + ourEnemy + "Box").addClass("hide");
        $(".restart").removeClass("hide");
        readyForAttack = false;
        return;

    } else if (enemyHealthPoints <= 0 ) {
        //hero wins - display message

        $(".enemyBox #" + ourEnemy + "Box").remove();

        if (remainingCharacters === 0) {
          //hero wins game
          $(".enemyMsg").html("");
          $(".heroMsg").html("You won!  Game Over!!!");
          $(".restart").removeClass("hide");
          readyForAttack = false;
          return;
        }

        $(".heroMsg").html("Awesome! You defeated " + ourEnemy + ".  Select another enemy.");
        $(".enemyMsg").html("");
        readyForAttack = false;
        return;

    } else {

      //hero message
      $(".heroMsg").html("You attacked " + ourEnemy + " for " + heroAttackPowerGrow + " damage.");
    
      //enemy message
      $(".enemyMsg").html( ourEnemy + " attacked you for " + enemyCounterAttackPower + " damage.");

       //increase hero total AP by base attack power
       heroAttackPowerGrow+= heroAttackPower;
    }
   }) // *********** end of attack button
 
    // ********* restart
  $(".restart").on("click", function() {

    loadFunction();
    $(".restart").addClass("hide");

   })
 //********************************* 
//**********   functions
//**********************************

function loadFunction() {

  $(".instructions").html("Select a Hero");
  heroNeeded = true;
  readyForAttack = false;
  remainingCharacters = 0;
  // count the number of characters in the object
  for (var player in character) {
      if (character.hasOwnProperty(player)) {
       remainingCharacters++;
      }
  }

  //Load up chars with initial health
  $.each(character, function(key, value) {
    $("#" + key + "Health").html(character[key].healthPoints);
  });

  $(".heroBox #" + ourHero + "Box").remove();
  $(".enemyBox #" + ourEnemy + "Box").remove();
  $(".restart").addClass("hide");
  $(".heroMsg").html("");
  $(".pictureBox").removeClass("hide").css({"background-color":"white", "color":"darkblue"});
 
  // userTotal = 0;
  // $(".userTotal").html(userTotal);
  // // Store the crystal random number in the data element

  // //get the random number to be matched
  // randomMatchNo  = (Math.floor(Math.random() * 102) + 19);
  // $(".computerNo").html(randomMatchNo);

}  //**********  end of loadFunction

//Gets important character data from object
function getCharData(charType, charName) {

  if (charType === "hero") {

    heroHealthPoints = character[charName].healthPoints;
    heroAttackPower = character[charName].attackPower;
    heroAttackPowerGrow = heroAttackPower;
    heroCounterAttackPower = character[charName].counterAttackPower;    

  } else {

    enemyHealthPoints = character[charName].healthPoints;
    enemyAttackPower = character[charName].attackPower;
    enemyCounterAttackPower = character[charName].counterAttackPower;    
  }

  remainingCharacters--;

}  //*********** end of getCharData

})  //********** end of document ready