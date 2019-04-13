'use strict';

//3rd Party Resources
const express = require('express');
const cors = require('cors');
const dictionary = require('./modules/dictionary');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

//Prepare express app
const app = express();

//App level MW
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//Routes go here if we need them

//============================================================
// Functionality
//============================================================

// Ask user name, difficulty, # words

// Runs dictionary

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  }
};