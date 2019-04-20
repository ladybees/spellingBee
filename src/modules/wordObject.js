'use strict';

class WordObject{

   constructor(word, sentence, audioFilePathWord, audioFilePathSentence){
    this.word = word;
    this.sentence = sentence;
    this.audioFilePathWord = audioFilePathWord;
    this.audioFilePathSentence = audioFilePathSentence;
  }

  wordReplaceByLine(){
    let regex = new RegExp(this.word, 'gi');
    this.sentence = this.sentence.replace(regex, '______');
    return this.sentence;
  }

}

module.exports = WordObject;