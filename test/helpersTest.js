const { assert } = require('chai');
//const assert  = require("chai").assert;

const bcrypt = require('bcrypt');

const { generateRandomString, urlsForUser,authenticateUser, checkEmail,addNewUser ,createNewUrl,updateUrl } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: bcrypt.hashSync("purple-monkey-dinosaur", 10)
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: bcrypt.hashSync("dishwasher-funk", 10)
  },
  "testID": {
    id: "test", 
    name : "name3" ,
    email: "test@test.com", 
    password: bcrypt.hashSync("test", 10)
  }
};
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "testID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "testID" },
  kjG89r: { longURL: "https://www.lighthouse.ca", userID: "foufa" },
  ffffff: { longURL: "https://www.fayza.ca", userID: "fayza" }


  };
describe('authenticateUser', function() {
  it('it shoudl return a a user Id', function() {
    const userId = authenticateUser(testUsers, "test@test.com", "test");
    const expectedOutput = "testID";
    assert.equal(userId, expectedOutput);
  });
  it('should return a undefined ', function() {
    const userId = authenticateUser(testUsers, "test@test.com", "testID");
    const expectedOutput = false;
    assert.equal(userId, expectedOutput);
  });
});



//generateRandomString, urlsForUser,authenticateUser, checkEmail,addNewUser ,createNewUrl,updateUrl