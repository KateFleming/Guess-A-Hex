// Stopwatch
var stopwatch = function(){
  // Current time in seconds
  var time = 0;
  // How often the interval runs
  var interval = 1; // Every second
  // Interval
  var timer;
  // Where the timer is displayed
  var display = $('.timer');
  
  // Pad with leading zero
  function pad(num){
    if(num < 10){
      return "0"+num;
    } else {
      return num;
    }
  }
  function format(m){
    var minute = pad(Math.floor(m / 60) % 60);
    var second = pad(Math.floor(m % 60));
    // var millisecond = pad(m % 100);
    return minute + ":" + second;
  }
  
  // Return the time
  function publicTime(){
    return time;
  }
  
  // Start the timer
  function publicStart(){
    function go(){
      display.text(format(time));
      time += interval;
    }
    display.addClass("timing");
    timer = setInterval(go, interval * 1000);
    go();
    return this;
  }
  
  // Stop the timer
  function publicStop(){
    display.removeClass("timing");
    clearInterval(timer);
    return this;
  }
  
  // Reset the timer
  function publicReset(){
    time = 0;
    return this;
  }
  
  return {
    start: publicStart,
    stop: publicStop,
    reset: publicReset,
    time: publicTime
  }
}();