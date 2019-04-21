'use strict';


const supergoose = require('./supergoose.js');
const {server} = require('../src/app');
const Word = require('../src/modules/wordObject');
const dictionary = require('../src/modules/dictionary');
const difficulty = require('../src/modules/checkDifficulty');
require('dotenv').config();

const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('application tests', () => {
  describe('api server + route tests', () => {

    it('should respond with a 404 on an invalid route', () => {

      return mockRequest
        .get('/foo')
        .then(results => {
          expect(results.status).toBe(404);
        });

    });

    it('should respond with 200 on route "/" ', () => {

      return mockRequest
        .get('/')
        .then(results => {
          expect(results.status).toBe(200);
        })

    });

    it('should respond with 200 on route "/scores" ', () => {

      return mockRequest
        .get('/scores')
        .then(results => {
          expect(results.status).toBe(200);
        })

    });

    it('should respond with 200 on when posting to "/score"', () => {

      let input = {name: 'liana', difficulty: 'easy', score: 4};

      return mockRequest
        .post('/score')
        .send(input)
        .expect('Content-Type', /html/)
        .then(results => {
          expect(results.status).toBe(200);
        })

    });

    it('should respond with 200 on when posting to "/game"', () => {

      let input = {name: 'liana', difficulty: 'easy', number: 3};

      return mockRequest
        .post('/game')
        .send(input)
        .then(result => {
          expect(result.status).toBe(200);
        })

    });
  });
  describe('functionality tests', () => {
    it('dictionary.js module - returns X number of word objects based on user input', async () => {
      // This test seems to run fine locally but throws an error on Travis due to lack of private key needed from the .env
      let testWord = await dictionary(1, 'easy');

      expect(testWord).toBeTruthy();
      expect(testWord[0].word).toBeTruthy();
    });
    it('wordObject.js module - can create new Word Object and replace word sentence with blank lines', async () => {
      let wordObject = new Word('test', 'this is a test', 'test.mp3', 'test-sentence.mp3');

      expect(wordObject).toBeTruthy();
      expect(wordObject.word).toBe('test');
      expect(wordObject.sentence).toBe('this is a test');

      wordObject.wordReplaceByLine();
      expect(wordObject.sentence).toBe('this is a ______');
    });
    it('checkDifficulty.js module - returns only objects with the user\'s difficulty', async () => {
      // This test seems to run fine locally but throws an error on Travis due to lack of private key needed from the .env
      let arr = ['dog', 'test', 'trash', 'embarrass'];
      let testHard = await difficulty(arr, 'hard');
      let testMedium = await difficulty(arr, 'medium');
      expect(testHard).toEqual(['embarrass']);
      expect(testMedium).toEqual(['trash', 'embarrass']);
    });
  })
});
