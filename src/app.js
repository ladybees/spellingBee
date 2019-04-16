'use strict';

//3rd Party Resources
const express = require('express');
const cors = require('cors');
const dictionary = require('./modules/dictionary');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

//Prepare express app
const app = express();

//App level MW
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Routes go here if we need them

app.get('/', (request, response) => {
  response.render('index');
});
app.post('/game', startGame);

//============================================================
// Functionality
//============================================================

// Ask user name, difficulty, # words
function startGame(request, response){
  let [name, difficulty, number] = request.body.input;
  console.log(name, difficulty, number);
  let words = [
    {id: 1, word: 'banana', sentence: 'this shit is bananas.'},
    {id: 2, word: 'night', sentence: 'the night king is going to win.'},
    {id: 3, word: 'karate', sentence: 'chill, i know karate.'},
  ];

  response.render('game', {name: name, difficulty: difficulty, number: number, words: words});
}

// function checkSpelling(event){
//   event.preventDefault();
//
//   let spelling = event.target.spelledWord.value;
//   if(spelling.toLowerCase() === words[0].word.toLowerCase()){
//     //H'Liana - When a word is correct, it should toggle the current div and unhide the next div
//     $( ".target" ).toggle();
//   }
// }

// Runs dictionary

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  }
};