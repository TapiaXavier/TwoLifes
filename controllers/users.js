// importing user model
const User = require("../models/User");

function createUser(req, res) {
  var user = new User(req.body);
  res.status(200).send(user);
}

function getUsers(req, res) {

  //this will be modified once the db is up

  var user1 = new User(/*1, 'juaveg', 'Juan', 'Vega', 'juan@vega.com', '123', 'normal'*/);
  var user2 = new User(/*2, 'monveg','Monserrat', 'Vega', 'mon@vega.com', '321', 'anunciante'*/);
  res.send([user1, user2]);
}

function modifyUser(req, res) {
  
  //this will be modified once the db is up

  var user = new User(/*req.params.id, 'juaveg', 'Juan', 'Vega', 'juan@vega.com', '123', 'normal'*/);
  var modifications = req.body;
  user = { ...user, ...modifications };
  res.send(user);
}

function deleteUser(req, res) {
  res.status(200).send(`User ${req.params.id} was succesfully deleted`);
}

// exporting defined function
module.exports = {
  createUser,
  getUsers,
  modifyUser,
  deleteUser,
};
