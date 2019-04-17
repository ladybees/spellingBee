'use strict';

const express = require('express');
const router = express.Router();
// router.param('model', scoreModel);

//============================================================
// Router
//============================================================

router.get('/', (request, response) => {
  response.render('index');
});
router.post('/game', startGame);
router.post('/scores', postScore);
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
  let score = request.body;

  request.model.post(score)
    .then(result => {
      response.status(200).render('score', {scores: result})
    })
    .catch(next);
}

function getScores(request, response, next){
  request.model.get()
    .then(result => {
      response.status(200).render('score', {scores: result})
    })
    .catch(next);
}

module.exports = router;