/* Define SquareGame object which takes in width and height of board */
function SquareGame(width, height) {
  this.width = width;
  this.height = height;
  this.clickedBoxesNum = 0;
  this.counter = null;
}

/* Method that makes the game board */
SquareGame.prototype.makeBoard = function() {
  var tablehtml = '';
  // build table HTML
  for (var h=0; h < this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w < this.width; w++) {
      tablehtml += "<td id='" + w + '-' + h + "' class='visible'>";
    }
    tablehtml += "</tr>";
  }
  // add table to '#board' element
  $("#board").append(tablehtml);
  // set click events to the boxes once html elements are added. this method is defined below.
  this.setClickEvent();
};

/* Method which makes box disappear on click and starts timer */
SquareGame.prototype.setClickEvent = function() {
  var timerStarted = false;
  var count = 60;
  var self = this;
  var boxesNum = self.width * self.height;

  // define function to start timer
  function startTimer(){
    // show number of seconds
    $("#seconds").text(count);
    // if timer reaches zero, display losing screen & stop timer
    if (count <= 0) {
      self.displayEndScreen("OUTTA TIME!");
      clearInterval(counter);
    }
    else {
      count -= 1;
    }
  }

  // when a box is clicked, set class of the box from 'visible' to 'invisible'
  $('td').on('click', function(event){
    var boxStatus = ($(this).attr('class'));
    if (boxStatus === 'visible') {
      $(this).addClass('invisible').removeClass('visible');
      self.clickedBoxesNum++; // increment count of clicked boxes

      // start timer if not already started
      if (timerStarted == false) {
        counter = setInterval(startTimer, 1000); // 1000 will run it every 1 second
        timerStarted = true;
      };

      // if player wins game, display win screen
      if (self.clickedBoxesNum == boxesNum) {
        self.displayEndScreen("DONE!");
        clearInterval(counter);
      }
    };
  });
};

/* Method that displays end screen to user */
SquareGame.prototype.displayEndScreen = function(string) {
  $("td").hide();
  $("#board").append("<div id='endScreen'>"+string+"<br><a id='restart' href=''>Restart</a></div>"); // empty href link simply reloads the page on latest version of Chrome
}

// instantiate a 4X4 board of Square Game
var sqGame = new SquareGame(4, 4);
sqGame.makeBoard();