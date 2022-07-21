var scores, activePlayer, roundScore, gameOn, lastDice,input ;
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  //random number
  if (gameOn) {
    var dice_1 = Math.floor(Math.random() * 6) + 1;
    var dice_2 = Math.floor(Math.random() * 6) + 1;

    //display result

    document.getElementById("dice1").style.display = "block";
    document.getElementById("dice2").style.display = "block";
    document.getElementById("dice1").src = "img/" + "dice-" + dice_1 + ".png";
    document.getElementById("dice2").src = "img/" + "dice-" + dice_2 + ".png";
      //if a player rolls two 1's
      if (dice_1 == 1 && dice_2 == 1) {
          scores[activePlayer] = 0;
          document.querySelector("#total-" + activePlayer).textContent = 0;
          NextPlayer();
        } else if (dice_1 > 1 && dice_2 > 1) {
            roundScore += dice_1 + dice_2;
            document.getElementById("score-" + activePlayer).textContent = roundScore;
        } else {
            //Next Player
            NextPlayer();
        }
    //if you roll a 6 consecutively
    // if (dice == 6 && lastDice == dice) {
    //     scores[activePlayer] = 0;
    //     document.querySelector("#total-" + activePlayer).textContent = 0;
    //     NextPlayer();
    // }  else if (dice > 1) {
    //   roundScore += dice;
    //   document.getElementById("score-" + activePlayer).textContent = roundScore;
    // } else {
    //   //Next Player
    //   NextPlayer();
    // }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gameOn) {
    scores[activePlayer] += roundScore;
    document.querySelector("#total-" + activePlayer).textContent =
        scores[activePlayer];
      input = document.querySelector('.final-score').value;
      //pre-defining what the winner score will be
      var final
      // '', null and 0 equals false
      //checking if input is true
      if (input) {
          final = input
      } else {
          final = 100
      }
    if (scores[activePlayer] >= final) {
      document.querySelector(".name-" + activePlayer).textContent =
        "WINNER!!! 🏆";
      document
        .querySelector(".player" + activePlayer)
        .classList.remove("active");
      document.querySelector(".player" + activePlayer).classList.add("winner");
      document.querySelector("#dice1").style.display = "none";
      document.querySelector("#dice2").style.display = "none";
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
  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";
  //getElementbyid() is faster and used for only id only
  document.getElementById("total-0").textContent = 0;
  document.getElementById("total-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.querySelector(".name-0").textContent = "PLAYER 1";
  document.querySelector(".name-1").textContent = "PLAYER 2";
  document.querySelector(".player0").classList.add("active");
  //if player 1 won the last session
  document.querySelector(".player0").classList.remove("winner");
  //when player 2 won the last session
  document.querySelector(".player1").classList.remove("winner");
  document.querySelector("#total-0").style.color = "orangered";
  document.querySelector("#total-1").style.color = "orangered";
}

document.querySelector(".btn--new").addEventListener("click", init);
