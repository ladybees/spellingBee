'use strict';


const supergoose = require('./supergoose.js');
const supertest = require('supertest');
const {server} = require('.././src/app');

const mockRequest = supergoose.server(server);
const mockClient = supertest(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('api server + route tests', () => {

  it('should respond with a 404 on an invalid route', () => {

    return mockClient
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });


  // it('should respond with a 404 on an invalid method', () => {
  //
  //   return mockClient
  //     .post('/api/v1/players/12')
  //     .then(results => {
  //       expect(results.status).toBe(404);
  //     });
  //
  // })


  it('should be able to post to the score page', () => {

    let request =

      ((body){name: 'Xochil', difficulty: 'easy', score: 5, missedWord: 'banana'})
    ;

    return mockClient
      .post('/scores')
      .send(request)
      .then(results => {
        expect(results.status).toBe(200);

      });

  });
});
//
//
//   it('following a post to a valid model, should find a single record', () => {
//
//     let obj = {name:'John', bats:'R',throws:'R',position:'C',team:'Bunnies'};
//
//     return mockRequest
//       .post('/api/v1/players')
//       .send(obj)
//       .then(results => {
//         return mockRequest.get(`/api/v1/players/${results.body._id}`)
//           .then(list => {
//             expect(list.status).toBe(200);
//             expect(list.body.team).toEqual(obj.team);
//           });
//       });
//
//   });
//
// });
