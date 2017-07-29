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

var character = {
  leia: {healthPoints: 10,
         attackPower: 10,
         counterAttackPower: 10
        },
  hans: {healthPoints: 20,
         attackPower: 20,
         counterAttackPower: 20
        },        
  jth: {healthPoints: 30,
         attackPower: 30,
         counterAttackPower: 30
        },
  darth: {healthPoints: 40,
         attackPower: 40,
         counterAttackPower: 40
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
      $(".mainChar .pictureBox").css({"background-color":"red", "color":"black"});
      $(".instructions").html("Select an Enemy");
      getCharData("hero", ourHero);
      heroNeeded = false;

    } else if (!readyForAttack)  {

      ourEnemy = $(this).attr("id");
      $("#" + ourEnemy + "Box").addClass("hide");
      $("#" + ourEnemy + "Box").clone().appendTo(".enemyBox").removeClass("hide").css({"background-color":"black", "color":"white"});
      $(".instructions").html("ATTACK!");
      getCharData("enemy", ourHero);
      readyForAttack = true;
    }

  }) //********** end of character setup 

 // Attack logic
 $(".attackButton").on("click", function() {

    //decrease enemy hp by hero attack power
    enemyHealthPoints -= heroAttackPowerGrow;

    //decrease hero hp by enemy attack power
    heroHealthPoints-= enemyCounterAttackPower;

    //increase hero total AP by base attack power
    heroAttackPowerGrow += heroAttackPower;

    //update display hero
    $("." + ourHero + "Health").html(heroHealthPoints);

     //update display enemy
    $("." + ourEnemy + "Health").html(enemyHealthPoints);

    if (heroHealthPoints <= 0) {
        loadFunction();
        return;

    } else if (enemyHealthPoints <= 0 ) {
        //hero wins - display message 


    } else {

      //hero message
      $(".heroMsg").html("You attacked " + ourEnemy + "for " + heroAttackPowerGrow + "damage.");
    
      //enemy message
      $(".enemyMsg").html( ourEnemy + " attacked you for " + enemyCounterAttackPower + "damage.");

    }


 })
 
 //********************************* 
//**********   functions
//**********************************

function loadFunction() {

  $(".instructions").html("Select a Hero");
  heroNeeded = true;
  readyForAttack = false;

  //Load up chars with initial health
  $.each(character, function(key, value) {
    $("#" + key + "Health").html(character[key].healthPoints);
  });


  // userTotal = 0;
  // $(".userTotal").html(userTotal);
  // // Store the crystal random number in the data element

  // //get the random number to be matched
  // randomMatchNo  = (Math.floor(Math.random() * 102) + 19);
  // $(".computerNo").html(randomMatchNo);

}  //**********  end of loadfunction

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

}  //*********** end of getCharData

})  //********** end of document ready