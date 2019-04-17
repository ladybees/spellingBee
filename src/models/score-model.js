'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const scores = mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  score: { type: Number, required: true },
  lastWord: { type: String }
});

class Score {
  constructor(schema){
    this.schema = schema;
  }

  get()

}

module.exports = mongoose.model('scores', scores);