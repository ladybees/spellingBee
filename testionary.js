'use strict';

const express = require('express');
const cors = require('cors');
const superAgent = require('superagent');
const app = express();
app.use(cors());

app.get('/word', getWord);


