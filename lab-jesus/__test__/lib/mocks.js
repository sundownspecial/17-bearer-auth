'use strict';

const faker = require('faker');
const Auth = require('../../model/auth');

const mock = module.exports = {};

// Auth Mocks - One, Many, RemoveAll
mock.auth = {};

mock.auth.createOne = () => new Auth({ name: faker.hacker.adjective() }).save();

mock.auth.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.auth.createOne));

mock.auth.removeAll = () => Promise.all([Auth.remove()]);


// Auth Mocks - One, Many, RemoveAll
mock.auth = {};

mock.auth.createOne = () => {
  let result = {};

  return mock.auth.createOne()
    .then(auth => {
      result.auth = auth;
      return new Auth({
        username: faker.internet.username(),
        password: faker.internet.password(),
        email: faker.internet.email(),
      }).save();
    })
    .then(auth => result.auth = auth)
    .then(() => result);
};

mock.auth.createMany = n => {
  let result = {};
  //requests
  return mock.auth.createOne()
    .then(auth => {
      result.auth = auth;
      let authProms = new Array(n).fill(0).map(() => new Auth({
        username: faker.internet.username(),
        password: faker.internet.password(),
        email: faker.internet.email(),
      }).save());
      return Promise.all(authProms);
    })
    .then(auths => result.auths = auths)
    .then(() => result);
};

mock.auth.removeAll = () => Promise.all([Auth.remove()]);