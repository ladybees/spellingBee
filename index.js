'use strict';

require('dotenv').config();
const randomWord = require('random-words');
const speechToText = require('./src/modules/dictionary');

// Start up DB Server
const mongoose = require('mongoose');
const options = {
    useNewUrlParser:true,
    useCreateIndex: true,
};
mongoose.connect(process.env.MONGODB_URI, options);
speechToText;

// Start the web server
require('./src/app.js').start(process.env.PORT);
