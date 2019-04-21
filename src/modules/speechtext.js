'use strict';

const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();
const fs = require('fs');
let key = process.env.GOOGLE_PRIVATE_KEY || 'test';

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
  projectId: 'ladybees-f6169',
  credentials: {
    private_key: key.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    client_id: process.env.GOOGLE_CLIENT_ID
  }
});

const speechToText = (textToSynthesize, word) => {

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