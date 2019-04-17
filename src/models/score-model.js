'use strict';

const mongoose = require('mongoose');
const schema = require('./score-schema');
require('mongoose-schema-jsonschema')(mongoose);

class Score {
  constructor(){
  }

  get(){
    return schema.find();
  }

  post(entry){
    let newScore = new schema(entry);
    return newScore.save();
  }

}

module.exports = Score;