//This is an app to randomly choose colors
(function(){
  var start = 8;
  //Keeps tally of how many colors are avalible
  var counter = start;
  // Strikes
  var strikes = 3;
  var pick;
  // Element to contain colors
  var colorsContainer = $('.colors');
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
      $(".pick").text(pick);
    }
  };
  
  // Build out the gate
  build();
  
  colorsContainer.on('click','.color',function(){
    var background = $(this).attr("data-color");
    if (background == pick) {
      counter--; 
      if ( counter < 2) {
        alert ("YOU WIN!");
        counter = start;
      }
      build();
    }
    else {
      strikes--;
      if(strikes < 1){
        alert("Boom! You lost.");
        counter = start;
        strikes = 3;
        $('.strikes').text(strikes + " tries left");
        build();
      } else {
        $('.strikes').text(strikes + " tries left");
      }
    }
    
  });
  
})();