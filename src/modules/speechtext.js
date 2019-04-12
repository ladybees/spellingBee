'use strict';

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const speechToText = (textToSynthesize = 'hello world') => {

  // Construct the request
  const request = {
    input: {text: textToSynthesize},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  return client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    // Write the binary audio content to a local file

    fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        return;
      }
      console.log('Audio content written to file: output.mp3');
    });
  });
};

module.exports = speechToText;