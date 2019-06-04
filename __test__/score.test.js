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
    let testObj = {name: 'bob', difficulty: 'easy', score: 12, missedWord: 'hula'};

    return score.post(testObj)
      .then(record => {
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });

      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a score', () => {
    const score = new Score();
    let testObj = {name: 'bob', difficulty: 'easy', score: 12, missedWord: 'hula'};

    return score.post(testObj)
      .then(record => {
        return score.get(record)
          .then(score => {
            Object.keys(testObj).forEach(key => {
              console.log(Object.keys);
              expect(score[0][key]).toEqual(testObj[key]);
            });
            expect(record._id).toBeTruthy();
          });
      });
  });
});