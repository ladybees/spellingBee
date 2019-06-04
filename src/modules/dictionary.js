'use strict';

const randomWord = require('random-words');
const Word = require('./wordObject');
const superagent = require('superagent');
const synthesize = require('./speechtext');
const checkDifficulty = require('./checkDifficulty');

//============================================================
// API Requests to obtain word / sentence
//============================================================

/**
 * H'Liana - Create URLs that will be sent to Webster dictionary API
 * @param words - list of random words returned from API call
 * @returns {Array} of URLs that will be sent to Webster dictionary API
 */


function makeURL(words){
  let urls = [];
  words.forEach(word => {
  // let urls = [];
    urls.push(`https://dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${process.env.INTERMEDIATE_API_KEY}`);
  });
  return urls;
}

function getData(url){
  return superagent.get(url)
    .then(result => {
        let wordData = result.body[0].def[0].sseq;

        for(let i = 0; i < wordData.length; i++) {
          let sentenceCheck = wordData[i][0][1].dt;
          if (sentenceCheck !== undefined && sentenceCheck[1] !== undefined && sentenceCheck[1][1][0].t) {

          let resWord = result.body[[0][0]].meta.id;
          let resSent = wordData[i][0][1].dt[1][1][0].t;

          if(resWord) {
            resWord = resWord.replace(/:1/g, '');
            resWord = resWord.replace(/:2/g, '');
            resWord = resWord.replace(/:3/g, '');
          }

          let URL = 'http://localhost:3000'
          let sentence = resSent.replace(/\{\/?it}/g,'');
          return new Word(resWord, sentence, `${URL}/audio/${resWord}.mp3`, `${URL}/audio/${resWord}-sentence.mp3`);
          }
        }
      // console.log(wordsAndSentence)
    })
  .catch(err => console.error(err))
}

async function harderRandomWords(difficulty, numberOfQuestions){
  let harderWords = [];
  let minCorpusCount, maxCorpusCount;
  let results = 50;

  if (difficulty === 'medium'){
    minCorpusCount = 100000;
    maxCorpusCount = 300000;
  } else if (difficulty === 'hard'){
    minCorpusCount = 50000;
    maxCorpusCount = 100000;
  }

  if (numberOfQuestions >= 10){
    if (difficulty === 'medium') results += 20;
    if (difficulty === 'hard') results += 50;
  }

  let url = `http://api.wordnik.com/v4/words.json/randomWords?api_key=${process.env.WORDNIK_API_KEY}&hasDictionaryDef=true&minCorpusCount=${minCorpusCount}&limit=${results}&maxCorpusCount=${maxCorpusCount}&excludePartOfSpeech=proper-noun&includePartOfSpeech=noun,adjective,verb`;

  return superagent.get(url)
    .then(result => {
      let words = result.body;
      words.forEach(word => {
        harderWords.push(word.word)
      });

      return harderWords;
    })

}

async function textToSpeech(numberOfQuestions, difficulty){
// H'Liana - Using Promise.all to make multiple API Requests to send word to Webster Dictionary API

  const wordsAndSentence = [];

  try {
    let words;
    if (difficulty === 'easy'){
      words = await randomWord(5);
    } else {
      words = await harderRandomWords(difficulty, numberOfQuestions);
    }

    // H'Liana - From here, we narrow down the words that fit into the user's difficulty setting
    let finalWords = await checkDifficulty(words, difficulty);

    let urls = makeURL(finalWords);

    return Promise.all(urls.map(getData))
      .then(results => {
        results.forEach(result => {
          if (result !== undefined){
            wordsAndSentence.push(result);
          }
        })
      })
      .then(() => {
        // H'Liana - Should return array of objects (words and corresponding sentences)
        // Then, we need to convert to speech + create mp3 files

        if (wordsAndSentence.length > numberOfQuestions){
          let difference = wordsAndSentence.length - numberOfQuestions;
          wordsAndSentence.splice(numberOfQuestions, difference);
        }

        wordsAndSentence.map(word => {
          let wordAudio = synthesize(word.word, word.word);
          let sentAudio = synthesize(word.sentence, word.word + '-sentence');
          word.wordReplaceByLine();
        });

        return wordsAndSentence;
      });
  } catch(error) {
    throw error;
  }

}

module.exports = textToSpeech;
