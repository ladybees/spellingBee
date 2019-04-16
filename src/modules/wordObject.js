'use strict';

class WordObject{

   constructor(word, sentence, audioFilePathWord, audioFilePathSentence){
    this.word = word;
    this.sentence = sentence;
    this.audioFilePathSentence = audioFilePathWord;
    this.audioFilePathSentence = audioFilePathSentence;
  }

  wordReplacebyLine(){
    this.sentence = this.sentence.replace(this.word, '_________');
  }

}

module.exports = WordObject;