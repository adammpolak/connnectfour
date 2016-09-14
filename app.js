$(document).ready(function() {
  //script here
  console.log("frank");

//stores whose turn it is currently
var currentColor = "red"

//function to change current colors turn
var changeColor = function () {
  if (currentColor === "red") {
    currentColor = "black";
    $('#red').addClass('currentturn')
    $('#black').removeClass('currentturn')
  } else {
    currentColor = "red"
    $('#red').removeClass('currentturn')
    $('#black').addClass('currentturn')
  }
  return currentColor;
}

//stores what y position is available for a column
var dataStore = {
  0: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
  1: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
  2: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
  3: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
  4: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
  5: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
  6: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""}
}

var yPositionAvailable = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
}

var highlightTokens = {
  left: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currentx--;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  },
  right: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currentx++;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  },
  down: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currenty--;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  },
  downleft: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currenty--;
      currentx--;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  },
  upleft: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currenty++;
      currentx--;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  },
  downright: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currenty--;
      currentx++;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  },
  upright: function(xaxis, yaxis, amount) {
    var currentx = xaxis;
    var currenty = yaxis;
    while (amount>0) {
      currenty++;
      currentx++;
      $('[x='+currentx+'][y='+currenty+']').addClass('highlighted');
      amount--;
    };
  }
}

//if someone wins
var winner = function () {
  $('#center').html(currentColor.toUpperCase() + " WINS!");
  $('#red').hide();
  $('#black').hide();
  $('#center').css('margin', 'auto')
  $('#buttonrow').hide();
}

//to reset the board
var reset = function () {
  $('#center').html("");
  $('#red').show();
  $('#black').show();
  $('#center').css('margin', 'inherit')
  $('#buttonrow').show();
  buttonrow.html("");
  board.html("");
  setup();
  dataStore = {
    0: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    1: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    2: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    3: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    4: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    5: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    6: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""}
  };
  yPositionAvailable = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  }
}

//this function checks for a match
var checkMatches = function (xaxis, yaxis) {
xaxis = parseInt(xaxis);
yaxis = parseInt(yaxis);

// the variables below store the amount of same color in a row in each direction for the most recently placed token
  var left = 0;
  var right = 0;
  var down = 0;
  var downleft = 0;
  var downright = 0;
  var upleft = 0;
  var upright = 0;

// these functions go in each direction of current token and calculate how many in a row of the same color there are

  var leftCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currentx-1 >= 0 && dataStore[currentx-1][yaxis] === currentColor) {
      left++;
      currentx--;
    };
  };
  var rightCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currentx+1 < 7 && dataStore[currentx+1][yaxis] === currentColor) {
      right++;
      currentx++;
    };
  };
  var downCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currenty-1 >= 0 && dataStore[xaxis][currenty-1] === currentColor) {
      down++;
      currenty--;
    };
  };
  var downleftCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currenty-1 >= 0 && currentx-1 >= 0 && dataStore[currentx-1][currenty-1] === currentColor) {
      downleft++;
      currenty--;
      currentx--;
    };
  };
  var downrightCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currenty-1 >= 0 && currentx+1 < 7 && dataStore[currentx+1][currenty-1] === currentColor) {
      downright++;
      currenty--;
      currentx++;
    };
  };
  var upleftCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currenty+1 < 6 && currentx-1 >= 0 && dataStore[currentx-1][currenty+1] === currentColor) {
      upleft++;
      currenty++;
      currentx--;
    };
  };
  var uprightCheck = function() {
    var currentx = xaxis;
    var currenty = yaxis;
    while (currenty+1 < 6 && currentx+1 < 7 && dataStore[currentx+1][currenty+1] === currentColor) {
      upright++;
      currenty++;
      currentx++;
    };
  };
  leftCheck(); rightCheck();downCheck();downleftCheck();downrightCheck();upleftCheck();uprightCheck();
  //
  if (left+right >= 3 || down >= 3 || upleft + downright >= 3 || downleft + upright >= 3) {
    winner();
  };
  if (left+right >= 3) {
    $('[x='+xaxis+'][y='+yaxis+']').addClass('highlighted')
    highlightTokens.left(xaxis,yaxis,left);
    highlightTokens.right(xaxis,yaxis,right);
  };
  if (down >= 3) {
    $('[x='+xaxis+'][y='+yaxis+']').addClass('highlighted')
    highlightTokens.down(xaxis,yaxis,down);
  };
  if (upleft + downright >= 3) {
    $('[x='+xaxis+'][y='+yaxis+']').addClass('highlighted')
    highlightTokens.upleft(xaxis,yaxis,upleft);
    highlightTokens.downright(xaxis,yaxis,downright);
  };
  if (downleft + upright >= 3) {
    $('[x='+xaxis+'][y='+yaxis+']').addClass('highlighted')
    highlightTokens.downleft(xaxis,yaxis,downleft);
    highlightTokens.upright(xaxis,yaxis,upright);
  };
};

//takes coordinates and calls change color function and changes
//data store values

var colorSpace = function (xaxis, yaxis) {
  var selectedSpace = $('[x='+xaxis+'][y='+yaxis+']')
  selectedSpace.css('background-color', changeColor());
  dataStore[xaxis][yaxis] = currentColor;
  checkMatches(xaxis, yaxis);
}

//function that returns value of y value that should change color
var columnHeight = function (column) {
  colorSpace(column, yPositionAvailable[column]);
  yPositionAvailable[column]++;
}


  //Action of dropping a token into a column
  //decides what y-axis should change color
  var droptoken = function () {
    columnHeight(this.id);
  }

  //setting up column buttons
  //setting up board spaces and column buttons
  var buttonrow = $('#buttonrow')
  var board = $('#board')
  var setup = function() {
    for (var x = 0; x < 7; x++) {
      for (var y = 0; y < 6; y++) {
        var space = $('<div>');
        space.attr('y', y);
        space.attr('class', 'space');
        space.attr('x', x);
        board.append(space);
      };
      var button = $('<button>Drop Here</button>');
      button.attr('class', 'button');
      button.attr('id', x);
      button.on('click', droptoken);
      buttonrow.append(button);
    }
  }
  setup();
  $('#reset').on('click', function() {
    reset();
  });
});


//Status of the coordinates of colored tokens


//Updating the UI of the board

//check if win
