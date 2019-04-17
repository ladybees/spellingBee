'use strict';

//3rd Party Resources
const express = require('express');
const cors = require('cors');
const dictionary = require('./modules/dictionary');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM().window);

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
    {id: 1, word: 'bananas', sentence: 'this shit is bananas.'},
    {id: 2, word: 'night', sentence: 'the night is dark.'},
    {id: 3, word: 'karate', sentence: 'chill, i know karate.'},
  ];

  checkSpelling(words);

  response.render('game', {name: name, difficulty: difficulty, number: number, words: words});
}

function checkSpelling(words){
  //console.log(words)
  words.forEach(word => {
    let div = `#word${word.id}`;


    });
}

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