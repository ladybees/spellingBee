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
const words = randomWord(5);
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

  // console.log(url);

  return superagent.get(url)

    .then(result => {

      for(let i = 0; i < result.body[0].def[0].sseq.length; i++) {

        let sentenceCheck = result.body[0].def[0].sseq[i][0][1].dt;

        if (sentenceCheck !== undefined && sentenceCheck[1] !== undefined && sentenceCheck[1][1][0].t) {

          let resWord = result.body[[0][0]].meta.id;
          let resSent = result.body[0].def[0].sseq[i][0][1].dt[1][1][0].t;

          let word;
          if(resWord){
            word = resWord.replace(/:1/g, '');
          }else{
            word = resWord;
          }
          let sentence = resSent.replace(/\{\/?it}/g,'');
          console.log(sentence);
          wordsAndSentence.push(
          new Word(word, sentence)
          );
          break
        }
      };
      // console.log(wordsAndSentence)
    })
  .catch(err => console.error(err))
}


function speechToText(){
// H'Liana - Using Promise.all to make multiple API Requests to send word to Webster Dictionary API

    makeURL(words);
    return Promise.all(urls.map(getData))
      .then(result => {

        let index = 1;
        console.log(result);
        // H'Liana - Should return array of objects (words and corresponding sentences)
        // Then, we need to convert to speech + create mp3 files
        wordsAndSentence.forEach(word => {
          let wordAudio = synthesize(word.word, index);
          let sentAudio = synthesize(word.sentence, 'Sentence'+index);
          index++
        });
      });
}


speechToText();

module.exports = {speechToText};
