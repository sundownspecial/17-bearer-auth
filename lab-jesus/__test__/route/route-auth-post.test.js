'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');
const faker = require('faker');
require('jest');

describe('POST /api/v1/auth', function() {
  beforeAll(() => this.base = `:${process.env.PORT}/api/v1/signup`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.auth.removeAll);

  describe('Valid requests', () => {


    it('should return a status of 201', () => {
      return superagent.post(`${this.base}`)
        .send({username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email()})
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });
    it('should return a token if post is succesful', () => {
      return superagent.post(`${this.base}`)
        .send({username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email()})
        .then(res => {
          let rawBuff = Buffer.from(res.body.split('.')[1], 'base64').toString(); 
          expect(rawBuff).toContain('token');
        });
    });

    // it('should return a new auth instance', () => {
    //   expect(this.response.body).toHaveProperty('_id');
    // });
  });

  // describe('inValid requests', () => {
  //   it('should return a status 400 given no request body', () => {
  //     return superagent.post(`${this.base}`)
  //       .send()
  //       .catch(err => expect(err.status).toEqual(400));
  //   });
  //   it('should return a status 400 given an improperly formatted body', () => {
  //     return superagent.post(`${this.base}`)
  //       .send({gnarf: 200})
  //       .catch(err => expect(err.status).toEqual(400));
  //   });
  // });
});