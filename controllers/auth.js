const mongoose =require('mongoose');
const User =mongoose.model('User');
const passport= require('passport');


function signUp(req, res,next){
  const body=req.body, password=body.password;
  delete body.password;
  const user =new User(body);
  user.createPassword(password);
  user.save()
  .then(user=>{
    return res.status(200).json(user.toAuthJSON())
  })
  .catch(next)
}

function login(req,res,next){
  if(!req.body.email || !req.body.password){
    return res.status(422).json({error:{email:'falta informacion'}})
  }

   passport.authenticate('local',
  {session:false },
  function(err,user,info){
    if(err){return next(err)}
    if(user){
      user.token=user.generateJWT();
      const {email,username,token,id}=user;
      return res.status(200).json({username:username,
        id:id,
        email:email,
        token:token})
    }else{
      return res.status(422).json(info);
    }
  })(req,res,next);
}

function deleteAccount(req, res,next){
  User.findByIdAndDelete({_id: req.user.id})
  .then(user=>{
    user.msj='User eliminado exitosamente',
    res.status(200).json(user);
  })
  .catch(next)
}

module.exports={
  signUp,
  login,
  deleteAccount
}