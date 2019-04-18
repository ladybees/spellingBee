'use strict';

class WordObject{

   constructor(word, sentence, audioFilePathWord, audioFilePathSentence){
    this.word = word;
    this.sentence = sentence;
    this.audioFilePathWord = audioFilePathWord;
    this.audioFilePathSentence = audioFilePathSentence;
  }

  wordReplaceByLine(){
    this.sentence = this.sentence.replace(this.word, '______');
    return this.sentence;
  }

}

module.exports = WordObject;