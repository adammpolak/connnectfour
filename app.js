$(document).ready(function() {
  //script here

// this object stores game data
var game =  {
  movesMade: 0,
  currentColor: "black",
  dataStore: {
    0: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    1: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    2: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    3: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    4: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    5: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
    6: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""}
  },
  yPositionAvailable: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  },
  changeColor: function () {
    if (game.currentColor === "red") {
      game.currentColor = "black";
    } else {
      game.currentColor = "red"
    }
    UI.currentTurn();
  }
}

//this object stores methods that alter the UI
var UI = {
  currentTurn: function () {
    if (game.currentColor === "red") {
      $('#red').addClass('currentturn')
      $('#black').removeClass('currentturn')
    } else {
      $('#red').removeClass('currentturn')
      $('#black').addClass('currentturn')
    }
  },
  highlightTokens: {
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
  },
  reset: function () {
    $('#center').html("");
    $('#red').show();
    $('#black').show();
    $('#center').css('margin', 'inherit')
    $('#buttonrow').show();
    buttonrow.html("");
    board.html("");
    UI.setup();
    game.dataStore = {
      0: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
      1: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
      2: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
      3: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
      4: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
      5: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""},
      6: {0: "", 1: "", 2: "", 3: "", 4: "", 5: ""}
    };
    game.yPositionAvailable = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    };
    game.movesMade = 0;
  },
  staleMate: function() {
    $('#center').html("STALE MATE!");
    $('#red').hide();
    $('#black').hide();
    $('#center').css('margin', 'auto')
    $('#center').css('margin-bottom', '46px')
    $('#buttonrow').hide();
  },
  winner: function () {
    $('#center').html(game.currentColor.toUpperCase() + " WINS!");
    $('#red').hide();
    $('#black').hide();
    $('#center').css('margin', 'auto')
    $('#center').css('margin-bottom', '46px')
    $('#buttonrow').hide();
  },
  setup: function() {
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
      button.on('click', brain.droptoken);
      buttonrow.append(button);
    }
    $('#reset').on('click', function() {
    UI.reset();
    });
  }
}

//this object stores methods that deal with logic matches/stalemate
var logic = {
  checkMatches: function (xaxis, yaxis) {
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
      while (currentx-1 >= 0 && game.dataStore[currentx-1][yaxis] === game.currentColor) {
        left++;
        currentx--;
      };
    };
    var rightCheck = function() {
      var currentx = xaxis;
      var currenty = yaxis;
      while (currentx+1 < 7 && game.dataStore[currentx+1][yaxis] === game.currentColor) {
        right++;
        currentx++;
      };
    };
    var downCheck = function() {
      var currentx = xaxis;
      var currenty = yaxis;
      while (currenty-1 >= 0 && game.dataStore[xaxis][currenty-1] === game.currentColor) {
        down++;
        currenty--;
      };
    };
    var downleftCheck = function() {
      var currentx = xaxis;
      var currenty = yaxis;
      while (currenty-1 >= 0 && currentx-1 >= 0 && game.dataStore[currentx-1][currenty-1] === game.currentColor) {
        downleft++;
        currenty--;
        currentx--;
      };
    };
    var downrightCheck = function() {
      var currentx = xaxis;
      var currenty = yaxis;
      while (currenty-1 >= 0 && currentx+1 < 7 && game.dataStore[currentx+1][currenty-1] === game.currentColor) {
        downright++;
        currenty--;
        currentx++;
      };
    };
    var upleftCheck = function() {
      var currentx = xaxis;
      var currenty = yaxis;
      while (currenty+1 < 6 && currentx-1 >= 0 && game.dataStore[currentx-1][currenty+1] === game.currentColor) {
        upleft++;
        currenty++;
        currentx--;
      };
    };
    var uprightCheck = function() {
      var currentx = xaxis;
      var currenty = yaxis;
      while (currenty+1 < 6 && currentx+1 < 7 && game.dataStore[currentx+1][currenty+1] === game.currentColor) {
        upright++;
        currenty++;
        currentx++;
      };
    };
    leftCheck(); rightCheck();downCheck();downleftCheck();downrightCheck();upleftCheck();uprightCheck();
    //
    if (left+right >= 3 || down >= 3 || upleft + downright >= 3 || downleft + upright >= 3) {
      $('[x='+xaxis+'][y='+yaxis+']').addClass('highlighted')
      UI.winner();
    };
    if (left+right >= 3) {
      UI.highlightTokens.left(xaxis,yaxis,left);
      UI.highlightTokens.right(xaxis,yaxis,right);
    };
    if (down >= 3) {
      UI.highlightTokens.down(xaxis,yaxis,down);
    };
    if (upleft + downright >= 3) {
      UI.highlightTokens.upleft(xaxis,yaxis,upleft);
      UI.highlightTokens.downright(xaxis,yaxis,downright);
    };
    if (downleft + upright >= 3) {
      UI.highlightTokens.downleft(xaxis,yaxis,downleft);
      UI.highlightTokens.upright(xaxis,yaxis,upright);
    };
  },
  checkStaleMate: function() {
    if (game.movesMade === 42) {
      UI.staleMate();
    }
  },
  columnHeight: function (column) {
    brain.colorSpace(column, game.yPositionAvailable[column]);
    game.yPositionAvailable[column]++;
    if (game.yPositionAvailable[column] === 6) {
      $('#'+column).prop('disabled',true);
    }
  }
}

//this dictates what functions are called and when
var brain = {
  colorSpace: function (xaxis, yaxis) {
    var selectedSpace = $('[x='+xaxis+'][y='+yaxis+']')
    selectedSpace.css('background-color', game.currentColor);
    game.dataStore[xaxis][yaxis] = game.currentColor;
    logic.checkMatches(xaxis, yaxis);
    game.changeColor()
  },
  droptoken: function () {
  logic.columnHeight(this.id);
  game.movesMade++;
  logic.checkStaleMate();
}
}

var buttonrow = $('#buttonrow')
var board = $('#board')
UI.setup();

});
