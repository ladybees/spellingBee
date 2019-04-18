'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/score-model');
const model = new Model();
const textToSpeech = require('../modules/dictionary');

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
async function startGame(request, response){
  let [name, difficulty, number] = request.body.input;

  try {
    let words = await textToSpeech();
    response.render('game', {name: name, difficulty: difficulty, number: number, words: words});
  } catch(e) {
    next(e);
  }
}

function postScore(request, response, next){

  model.post(request.body)
    .then(result => {
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