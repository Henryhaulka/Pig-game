var scores, activePlayer, roundScore, gameOn, lastDice,input ;
init();
//Math.random returns a number less than 1
//Math.floor rounds a float down
// without +1, we return a number 0 and less than 6

//querySelector works like css selector
//textContext changes only text in html
//"#score-" + activePlayer example of coercion
//innerHtml= changes the html tags
// document.querySelector("#score-" + activePlayer).innerHTML = "<i>" + dice + "</i>";
// document.querySelector("#score-" + activePlayer).textContent = dice;

//read doc for callback and anonymous functions
//read doc for event listeners
//below is an anonymous function ie not stored in an outter function, hence can't be reduced but under
//only in that function it is call, it opposite is CALLBACK i.e outside
document.querySelector(".btn-roll").addEventListener("click", function () {
  //random number
  if (gameOn) {
    var dice = Math.floor(Math.random() * 6) + 1;

    //display result
    var diceImage = document.querySelector(".dice");
    diceImage.style.display = "block";
    diceImage.src = "img/" + "dice-" + dice + ".png";
      //if you roll a 6 consecutively
    if (dice == 6 && lastDice == dice) {
        scores[activePlayer] = 0;
        document.querySelector("#total-" + activePlayer).textContent = 0;
        NextPlayer(); 
    }  else if (dice > 1) {
      roundScore += dice;
      document.getElementById("score-" + activePlayer).textContent = roundScore;
    } else {
      //Next Player
      NextPlayer();
    }
       lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gameOn) {
    scores[activePlayer] += roundScore;
    document.querySelector("#total-" + activePlayer).textContent =
        scores[activePlayer];
       input = document.querySelector('.final-score').value;
      var final
      // '', null and 0 equals false
      //checking if input is true
      if (input) {
          final = input
      } else {
          final = 50
      }
    if (scores[activePlayer] >= final) {
      document.querySelector(".name-" + activePlayer).textContent =
        "WINNER!!! 🏆";
      document
        .querySelector(".player" + activePlayer)
        .classList.remove("active");
      document.querySelector(".player" + activePlayer).classList.add("winner");
      document.querySelector(".dice").style.display = "none";
      document.querySelector("#total-" + activePlayer).style.color = "white";
      gameOn = false;
    } else {
      NextPlayer();
    }
  }
});

function NextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.querySelector(".player0").classList.toggle("active");
  document.querySelector(".player1").classList.toggle("active");
  // document.querySelector(".player1").classList.remove("active");
  // document.querySelector(".player2").classList.add("active");
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameOn = true;
  document.querySelector(".dice").style.display = "none";

  //getElementbyid() is faster and used for only id only
  document.getElementById("total-0").textContent = 0;
  document.getElementById("total-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.querySelector(".name-0").textContent = "PLAYER 1";
  document.querySelector(".name-1").textContent = "PLAYER 2";
  document.querySelector(".player0").classList.add("active");
  document.querySelector(".player0").classList.remove("winner");
  //when player 2 wins
  document.querySelector(".player1").classList.remove("winner");
  document.querySelector("#total-" + activePlayer).style.color = "orangered";
}

document.querySelector(".btn--new").addEventListener("click", init);
