'use strict';

const express = require('express');
const dictionaryRouter = express.Router();
const superagent = require('superagent');
const synthesize = require('./speechtext');


//============================================================
// API Requests to obtain random list of words
//============================================================

const words = ['banana'];
const urls = [];

//============================================================
// API Requests to obtain word / sentence
//============================================================

// H'Liana - this does not work yet. Need to refactor a bit.

/**
 * H'Liana - Create URLs that will be sent to Webster dictionary API
 * @param words - list of random words returned from API call
 * @returns {Array} of URLs that will be sent to Webster dictionary API
 */
function makeURL(words){
  words.forEach(word => {
    urls.push(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.COLLEGIATE_API_KEY}`);
    });
  console.log(urls);

}

function getData(url){
  console.log(url);
  return superagent.get(url)
    .then(result => {

      // H'Liana - need to find where in data we can access word + sentence
      let sentence = result.body[[0][0]].def[0].sseq[0][0][1].dt[1][1][0].t; //PLACEHOLDER
      let word = result.body[[0][0]].meta.id;

      return {'word': word, 'sentence': sentence};
    })
  .catch(err => console.error(err))
}

// H'Liana - Using Promise.all to make multiple API Requests to send word to Webster Dictionary API
function speechToText(){
  makeURL(words);
  return Promise.all(urls.map(getData))
    .then(result => {
      // H'Liana - Should return array of objects (words and corresponding sentences)
      // Then, we need to convert to speech + create mp3 files
      result.forEach(word => {
        synthesize(word);
      })
    });
}
console.log(urls);
speechToText();

module.exports = { speechToText};
