'use strict';

const superagent = require('superagent');

function makeURL(words, difficulty){
  let urls = [];
  words.forEach(word => {
    let obj = { word: word, difficulty: difficulty, url: `https://twinword-language-scoring.p.rapidapi.com/text/?text=${word}` };
    urls.push(obj)
  });
  return urls;
}

function getDifficulty(obj){
  let url = obj.url;
  let userDifficulty = obj.difficulty;

  return superagent.get(url)
    .set('X-RapidAPI-Host', `${process.env.TWINWORDS_HOST}`)
    .set('X-RapidAPI-Key', `${process.env.TWINWORDS_KEY}`)
    .then(result => {
      let wordDifficulty = result.body.ten_degree;
      switch(userDifficulty){
        case 'easy':
          if (wordDifficulty <= 3){
            return obj.word;
          }
        case 'medium':
          if (wordDifficulty > 3 && wordDifficulty < 6){
            return obj.word;
          }
        case 'hard':
          if (wordDifficulty >= 5){
            return obj.word;
          }
      }
    }).catch(error => {

    })
}

async function getFinalWords(wordArr, difficulty){
  let finalWords = [];
  try{
    let url = makeURL(wordArr, difficulty);
    return Promise.all(url.map(getDifficulty))
      .then(result => {
        result.forEach(word => {
          if (word !== undefined){
            finalWords.push(word);
          }
        });
        return finalWords;
      }).catch(err => console.error(err))
  } catch(e){
    throw e;
  }

}

module.exports = getFinalWords;