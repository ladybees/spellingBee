'use strict';

const mongoose = require('mongoose');

const scores = mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  score: { type: Number, required: true },
  missedWord: { type: String }
});

module.exports = mongoose.model('scores', scores);