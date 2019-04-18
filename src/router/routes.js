'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/score-model');
const model = new Model();

//============================================================
// Router
//============================================================

router.get('/', (request, response) => {
  response.render('index');
});
router.post('/game', startGame);
router.post('/score', postScore);
router.get('/scores', getScores);

//============================================================
// Functionality
//============================================================

// Ask user name, difficulty, # words
function startGame(request, response){
  let [name, difficulty, number] = request.body.input;

  let words = [
    {id: 1, word: 'bananas', sentence: 'this is bananas.'},
    {id: 2, word: 'night', sentence: 'the night is dark.'},
    {id: 3, word: 'karate', sentence: 'chill, i know karate.'},
    {id: 4, word: 'baby', sentence: '____ shark doo doo.'},
    {id: 5, word: 'april', sentence: 'the current month is _____.'}
  ];

  response.render('game', {name: name, difficulty: difficulty, number: number, words: words});
}

function postScore(request, response, next){

  model.post(request.body)
    .then(result => {
      console.log(result)
      response.status(200).render('score', {score: result})
    })
    .catch(next);
}

function getScores(request, response, next){
  model.get()
    .then(result => {
      response.status(200).render('scores', {scores: result})
    })
    .catch(next);
}

module.exports = router;