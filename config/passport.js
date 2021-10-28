const passport = require('passport');
const localStrategy= require('passport-local').Strategy;
const moongose= require('mongoose');
const User=moongose.model('User');

passport.use(new localStrategy({
  usernameField:'email',
  passwordField:'password'
},function (email,password,next){
  User.findOne({email:email})
  .then(function(user){
    
    if(!user||!user.validatePassword(password)){
    return next(null,false,{errors:{'credentials':'las crendenciales son incorrectas'}});
  }
  return next(null,user);
})
  .catch(next)
}));

