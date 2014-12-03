//This is an app to randomly choose colors
(function(){
  var level = 8;
  //Keeps tally of how many colors are avalible
  var counter = level;
  
  // Strikes
  var startingStrikes = 3;
  var strikes = startingStrikes;
  
  // Max time in seconds
  var maxtime = 300;
  
  var pick;
  // Element to contain colors
  var colorsContainer = $('.colors');
  var start = $('.start');
  var pickElem = $('.pick');
  var score = $('.score');
  
  //Randomly generate colors
  function randomColor(){
    function ran(){
      return Math.round(Math.random()*255);
    }
    var color = tinycolor("rgb("+ran()+","+ran()+","+ran()+")");
    return color.toHexString();
  }
  
  //Generate html color boxes using a for loop
  var build = function(){
    // Empty the container first
    colorsContainer.empty();
    var randomPick = Math.round(Math.random() * (counter - 1));
    for (var i=0; i < counter; i++){
      var setColor = randomColor();
      if (randomPick == i) {
        pick = setColor;
      }
      var colorBox = $("<div/>").attr("class","color").attr("data-color", setColor).css("background",setColor);
      colorsContainer.append(colorBox);
      pickElem.text(pick);
    }
  };
  
  // Build out the gate
  build();
  
  colorsContainer.on('click','.color',function(){
    var background = $(this).attr("data-color");
    if (background == pick) {
      counter--; 
      if ( counter < 2) {
        reset("win");
      }
      build();
    }
    else {
      strikes--;
      if(strikes < 1){
        reset("fail");
      } else {
        $('.strikes').text(strikes);
      }
    }
    
  });
  
  function toggleDisplay(){
    start.toggle();
    pickElem.toggle();
    colorsContainer.toggle();
    $('.console').toggle();
    $('.title').toggle();
  }
  
  function reset(status){
    // Show the score
    switch(status){
      case "win":
        var _score = (maxtime - stopwatch.time()) * 10;
        score.html("Yehaw! You scored a <em>" + _score + "</em>");
        break;
      case "fail":
        score.text("Boo. You Failed.");
        break;
      default:
        score.text("");
    }
    
    stopwatch.stop().reset();
    toggleDisplay();
    counter = level;
    strikes = startingStrikes;
    $('.strikes').text(strikes);
    build();
  }
  
  // Start guessing
  start.click(function(){
    switch($(this).attr('data-level')){
      case "hard":
        level = 12;
        break
      case "medium":
        level = 9;
        break;
      case "easy":
        level = 6;
        break;
    }
    reset("start");
    // Start the timer
    stopwatch.start();
  });
})();