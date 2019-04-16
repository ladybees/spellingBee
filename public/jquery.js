'use strict';

$(document).ready(function() {
  $('#div1').show();
  console.log('Ready');

  // Count amount of divs
  let numberDivs = $('div').length + 1;
  console.log(numberDivs)

  for (let i = 0; i < numberDivs; i++){
    $(`#div${i}`).on('keypress', function (e) {
      if (e.which == 13) {
        e.preventDefault();

        let value = $(`#spell${i}`).val();
        let word = $(`#word${i}`).val();
        console.log(value, word);
        if(value === word){
          $(this).toggle();
          $(this).next().toggle();
        }
      }
    })
  }

});

