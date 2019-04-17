'use strict';

$(document).ready(function() {
  $('#div1').show();
  console.log('Ready');

  // Count amount of divs
  let numberDivs = $('div').length + 1;
  let score = 1;

  for (let i = 0; i < numberDivs; i++){
    $(`#div${i}`).on('keypress', function (e) {
      if (e.which == 13) {
        e.preventDefault();

        let value = $(`#spell${i}`).val().toLowerCase();
        let word = $(`#word${i}`).val().toLowerCase();
        console.log(value, word);
        if(value === word){
          $('#score').text(score++);
          $(this).toggle();
          $(this).next().toggle();

          if(score === numberDivs){
            $('#final').show();
            $('#winOrLose').html('<h1>Congrats! You win!</h1>');
          }
        } else{
          $(this).toggle();
          $('#final').toggle();
          $('#winOrLose').html(`<h1>Sorry, you lose.</h1> <h4>The correct spelling is <i>${word}</i>.</h4>`);
        }
      }
    })
  }

});

