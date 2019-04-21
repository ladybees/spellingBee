'use strict';

const Score = require('../src/models/score-model');
const supergoose = require('./supergoose.js');
const supertest = require('supertest');
const {server} = require('.././src/app');

const mockRequest = supergoose.server(server);
const mockClient = supertest(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);



describe('Score model', () => {
  it('can post() a new score', () => {
    const score = new Score();
    let testObj = {results: 'Score'};

    return score.post(testObj)
      .then(record => {
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });

        expect(score.database.length).toEqual(1);
        expect(score.database).toBeTruthy();
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a score', () => {
    const score = new Score();
    let testObj = {name: 'bob', difficulty: 'easy', score: 12, missedWord: 'hula'};

    return score.post(testObj)

      .then(record => {
        console.log(testObj);
        return score.get(record)
          .then(score => {
            console.log(record, 'I AM THE RECORD');
            Object.keys(testObj).forEach(key => {
              console.log(Object.keys);
              expect(score[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });
});