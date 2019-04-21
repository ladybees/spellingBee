'use strict';

//3rd Party Resources
const express = require('express');
const cors = require('cors');
const router = require('./router/routes');
const bodyParser = require('body-parser');


//Prepare express app
const app = express();

//App level MW
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

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