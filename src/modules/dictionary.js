'use strict';

const express = require('express');
const dictionaryRouter = express.Router();
const superagent = require('superagent');
const synthesize = require('./speechtext');

//============================================================
// API Requests to obtain random list of words
//============================================================

function getWordList(){
  return words = ['banana', 'potato', 'dinosaur'];
}

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
  let urls = [];
  words.forEach(word => {
    urls.push(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`)
  });
  return urls;
}

function getData(){
  return superagent.get(url)
    .then(result => {
      let parsedResult = JSON.parse(result.text);

      // H'Liana - need to find where in data we can access word + sentence
      let word = parsedResult.word; //PLACEHOLDER
      let sentence = parsedResult.sentence; //PLACEHOLDER

      return {word: word, sentence: sentence};
    });
}

// H'Liana - Using Promise.all to make multiple API Requests to send word to Webster Dictionary API
function speechToText(){
  let urls = makeURL(words);
  return Promise.all(urls.map(getData))
    .then(result => {
      // H'Liana - Should return array of objects (words and corresponding sentences)
      // Then, we need to convert to speech + create mp3 files
      result.forEach(word => {
        synthesize(word);
      })
    });
}


module.exports = { getWordList, speechToText, getData, makeURL };