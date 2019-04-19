'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/score-model');
const model = new Model();
const path = require('path');
const fs = require('fs');

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
async function startGame(request, response, next){
  let [name, difficulty, number] = request.body.input;
  let directory = `${process.cwd()}/public/audio`;

  fs.readdir(directory, (err, files) => {
    if (err) console.log(err);

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        console.log('Deleting: ' + file);
        if (err) console.log(err);
      });
    }
  });

  try {
    let words = await textToSpeech(number, difficulty);
    response.render('game', {name: name, difficulty: difficulty, number: number, words: words});
  } catch(e) {
    next(e);
  }
}

  function postScore(request, response, next){
    // console.log(request.body)
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