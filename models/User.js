// User.js

class User {
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
  module.exports = User;