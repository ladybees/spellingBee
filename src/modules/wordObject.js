'use strict'


class WordObject{

     constructor(word, sentence, audioFilePathWord, audioFilePathSentence){
        this.word = word;
        this.sentence = sentence;
        this.wordFilePath = audioFilePathWord;
        this.sentenceFilePath = audioFilePathSentence;
    }

    sentenceCleanup(){

    }

    wordReplacebyLine(){
        this.sentence = this.sentence.replace(this.word, '______________');
    }

}


module.exports = WordObject;