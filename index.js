'use strict';

require('dotenv').config();
const mongodb = process.env.MONGODB_URI || process.env.MONGOLAB_PINK_URI;

// Start up DB Server
const mongoose = require('mongoose');
const options = {
    useNewUrlParser:true,
    useCreateIndex: true,
};
mongoose.connect(mongodb, options);

// Start the web server
require('./src/app.js').start(process.env.PORT);
