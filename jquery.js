let playing = false;
let score;
let trialsLeft;
let step;
let action; 
let fruits = ['apple', 'banana', 'cherries', 'grapes','mango', 'orange', 'peach', 'pear', 'watermelon'];
$(function (){
  $("#startreset").click(function(){
    if(playing == true){
    location.reload();
   }else{
     playing = true; 
     score = 0; 
     $("#scorevalue").html(score);
     $("#trialsLeft").show();
     trialsLeft = 3;
     addHearts();
     $("#gameOver").hide();
     $("#startreset").html("Reset Game");
     startAction();
 }
});
 
//slice a fruit
 
$("#fruit1").mouseover(function(){
   score++;
   $("#scorevalue").html(score); 
   // document.getElementById("slicesound").play();
   $("#slicesound")[0].play();
   clearInterval(action);
   $("#fruit1").hide("explode", 500);
   setTimeout(startAction, 1000);
});


 
function addHearts(){
  $("#trialsLeft").empty();
  for(i = 0; i < trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/icons8-red-heart-48.png" class="life">');
 }
}

function startAction(){

   $("#fruit1").show();
   chooseFruit();
   $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
 
   step = 1 + Math.round(5*Math.random());
   action = setInterval(function(){
      $("#fruit1").css('top', $("#fruit1").position().top + step); 
    //   Set between the value  + step   
      if($("#fruit1").position().top > $("#fruitsContainer").height()){
        if(trialsLeft > 1 ){
           $("#fruit1").show();
           chooseFruit();
           $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); 
           step = 1+ Math.round(5*Math.random());
           trialsLeft --;
           addHearts();
 
       }else{ 
           playing = false;
           $("#startreset").html("Start Game"); 
           $("#gameOver").show();
           $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
           $("#trialsLeft").hide();
           stopAction();
       }
 }}, 10);
}

// generate a random fruit
function chooseFruit(){
 $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] + '.png'); 
}

//Stop dropping fruits
function stopAction(){
  clearInterval(action);
  $("#fruit1").hide();
}
});