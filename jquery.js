$(function () {

  let playing = false; 
  let score; 
  let highScore = localStorage.getItem("fruitHighScore") || 0; 
  let trialsLeft; 
  let step; 
  let action; 
  let fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon', 'bomb']; 

  // Handle start/reset button click
  $("#startreset").click(function () {
    if (playing) {
      location.reload(); // Restart game
    } else {
      playing = true;
      score = 0;
      $("#scorevalue").html(score); // Reset score
      $("#trialsLeft").show(); // Show lives
      trialsLeft = 3;
      addHearts(); // Show 3 hearts
      $("#gameOver").hide(); // Hide game over panel
      $("#startreset").html("Reset Game");
      startAction(); // Start dropping fruits
    }
  });

  // Fruit slicing logic
  $("#fruit1").mouseover(function () {
    let src = $("#fruit1").attr('src');
    if (src.includes("bomb")) { 
      endGameImmediately(); 
      return;
    }

    score++; 
    $("#scorevalue").html(score);
    $("#slicesound")[0].play(); // Play slice sound
    clearInterval(action); // Stop movement
    $("#fruit1").hide("explode", 500); // Explode animation
    setTimeout(startAction, 1000); // Start new fruit after delay
  });

  // Add heart icons based on lives
  function addHearts() {
    $("#trialsLeft").empty();
    for (let i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img src="images/icons8-red-heart-48.png" class="life">');
    }
  }

  // Main fruit drop loop
  function startAction() {
    $("#fruit1").show();
    chooseFruit(); 
    $("#fruit1").css({
      'left': Math.round(550 * Math.random()),
      'top': -50
    });

    step = 1 + Math.round(5 * Math.random()); // Random speed
    action = setInterval(function () {
      $("#fruit1").css('top', $("#fruit1").position().top + step);

      // If fruit goes out of container
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        if (trialsLeft > 1) {
          $("#fruit1").show();
          chooseFruit();
          $("#fruit1").css({
            'left': Math.round(550 * Math.random()),
            'top': -50
          });
          step = 1 + Math.round(5 * Math.random());
          trialsLeft--;
          addHearts();
        } else {
          playing = false;
          $("#startreset").html("Start Game");
          $("#gameOver").show();

          // Show score and high score
          let finalMessage = '<p>Game Over!</p><p>Your score is ' + score + '</p>';
          if (score > highScore) {
            localStorage.setItem("fruitHighScore", score);
            finalMessage += '<p>🎉 New High Score!</p>';
          } else {
            finalMessage += '<p>High Score: ' + highScore + '</p>';
          }

          $("#gameOver").html(finalMessage);
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  // Choose a random fruit or bomb
  function chooseFruit() {
    let index = Math.floor(fruits.length * Math.random());
    $("#fruit1").attr('src', 'images/' + fruits[index] + '.png');
  }

  // Stop fruit dropping
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }

  // If a bomb is sliced
  function endGameImmediately() {
    playing = false;
    $("#startreset").html("Start Game");
    $("#gameOver").show();
    $("#gameOver").html('<p>💥 You hit a bomb!</p><p>Your score is ' + score + '</p>');
    $("#trialsLeft").hide();
    stopAction();
  }
});