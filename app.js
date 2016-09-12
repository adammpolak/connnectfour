$(document).ready(function() {
  //script here
  console.log("frank");
  var board = $('#board')

  for (var x = 0; x < 7; x++) {
    for (var y = 0; y < 6; y++) {
      var space = $('<div>');
      space.attr('y', y);
      space.attr('class', 'space');
      space.attr('x', x);
      board.append(space);
    };
  };
});


//Status of the coordinates of colored tokens

//Action of dropping a token into a column

//Updating the UI of the board

//check if win

//setting up board

var board = $('#board')

for (var x = 0; x <= 7; x++) {
  for (var y = 0; y <= 6; y++) {
    var space = $('<div>');
    space.attr('y', y);
    space.attr('class', 'space');
  };
  space.attr('x', x);
  board.append(space);
};
