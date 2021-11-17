// models- User.js

//imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt =require('jsonwebtoken');
const secret= require('../config').secret;


/*class User {
    constructor(id, username, name, lastname, email, password, type) {
      this.id = id;
      this.username = username;
      this.name = name;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.type = type; // buyer, vendor or admin type user
    }
  }
  module.exports = User;*/


  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: [true, "Username field cannot be empty"],
      lowercase: true,
      match : [/^[a-z0-9]+$/, "Invalid Username"],
      index: true
    },
    firstname: {
      type:String,
      required: true
    },
    lastname:{
      type:String,
      required: true
    },
    email: {
      type:String,
      unique: true,
      required: [true, "email missing"],
      match:[/\S+@\S+.\S+/, "Invalid email"],
      index: true
    },
    profile_pic: String,
    hash: String,
    salt: String
  }, {collection:"users_col", timestamps: true});
  
  UserSchema.plugin(uniqueValidator, {message : "Already exists"})
  
  UserSchema.methods.publicData = function() {
    return {
      id: this.id,
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      profile_pic: this.profile_pic 
    }
  }
  
  UserSchema.methods.createPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString("hex")
  }
  
  UserSchema.methods.validatePassword = function (password) {
    const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
    return this.hash === newHash
  }
  
  UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret)
  }
  
  UserSchema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT()
    }
  }
  
  
  mongoose.model("User", UserSchema)