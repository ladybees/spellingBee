'use strict';

const express = require('express');
const dictionaryRouter = express.Router();
const Word = require('./wordObject');
const superagent = require('superagent');
const synthesize = require('./speechtext');


//============================================================
// API Requests to obtain random list of words
//============================================================
const randomWord = require('random-words');
const words = randomWord(10);
const urls = [];
const wordsAndSentence = [];

//============================================================
// API Requests to obtain word / sentence
//============================================================

/**
 * H'Liana - Create URLs that will be sent to Webster dictionary API
 * @param words - list of random words returned from API call
 * @returns {Array} of URLs that will be sent to Webster dictionary API
 */
function makeURL(words){

  words.forEach(word => {
  // let urls = [];
    urls.push(`https://dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${process.env.INTERMEDIATE_API_KEY}`);
  });
  // return urls;
}
function getData(url){

  console.log(url);

  return superagent.get(url)

    .then(result => {

      for(let i = 0; i < result.body[0].def[0].sseq.length; i++) {

        if (result.body[0].def[0].sseq[i][0][1].dt[1] !== undefined && result.body[0].def[0].sseq[i][0][1].dt[1][1][0].t !== undefined) {
          wordsAndSentence.push({
            word: result.body[[0][0]].meta.id,
            sentence: result.body[0].def[0].sseq[i][0][1].dt[1][1][0].t
          });
          console.log(wordsAndSentence);
          break
        }
        // let sentence = result.body[[0][0]].def[0].sseq[0][0][1].dt[1][1][0].t; //PLACEHOLDER
        // let word = result.body[[0][0]].meta.id;
      }

    })
  .catch(err => console.error(err))
}

function speechToText(){
// H'Liana - Using Promise.all to make multiple API Requests to send word to Webster Dictionary API

    makeURL(words);
    return Promise.all(urls.map(getData))
      // .then(result => {
        // H'Liana - Should return array of objects (words and corresponding sentences)
        // Then, we need to convert to speech + create mp3 files
        // result.forEach(word => {
          // let wordAudio = synthesize(word.word);
          // let sentAudio = synthesize(word.sentence);

          // result.wordFilePath = wordAudio;
          // result.sentenceFilePath = sentAudio;
          // result.wordReplacebyLine();
        // });
        // console.log(result)
      // });

}


speechToText();

module.exports = {speechToText};
