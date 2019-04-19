'use strict';

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const speechToText = (textToSynthesize, word) => {

  // Construct the request
  const request = {
    input: {text: textToSynthesize},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
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
    let fileId = `./public/audio/${word}.mp3`;

    fs.writeFile(fileId, response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        return;
      }
      console.log(`Audio content written to file: ${fileId}`);
    });
  });
};

module.exports = speechToText;