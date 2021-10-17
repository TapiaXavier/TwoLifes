// importing user model
//const User = require("../models/User");

const mongoose = require("mongoose")
const User = mongoose.model("User")

//////CRUD//////////////////////////////////////////////////

//CREATE USER
function createUser (req, res, next){
	const body = req.body,
		password = body.password

	delete body.password
	const user = new User(body)

	user.createPassword(password);
	user.save()
	.then( user => {
		//return res.status(200).json(user.toAuthJSON())  //FOR USE WHEN AUTH IS ACTIVE
    //return res.status(200).send(user)   //VARIATION OF SENTENCE BELOW
    //res.status(200).send(user)        //GET ALL DATA 
    res.status(200).json(user.publicData())   //JUST THE DATA IN PUBLIC DATA FUNCTION
	})
	.catch(next)
}

//GET USERS
function getUsers(req, res, next) {

/////////GET JUST THE OWNER USER ACCOUNT///////////

  /*User.findById(req.user.id)
		.then(user => {
			if (!user) {
				return res.sendStatus(401)
			}
			return res.json(user.publicData())
		})
		.catch(next)*/

///////////////////////////////////////////////

    if (req.params.id){
      User.findById(req.params.id)
      .then(user => {
        //res.send(user)
        res.json(user.publicData())
      })
      .catch(next)
    } else {
      User.find().select("-hash -salt -createdAt -updatedAt -__v")
      .then(users => {
        res.send(users)
        //res.json(users.publicData())
      })
      .catch(next)
    }
}

//MODIFY USER
function modifyUser(req, res, next) {

  //User.findById(req.user.id).then(user => {  //WHEN USING AUTH
  User.findById(req.params.id).then(user => {
    if (!user) { return res.sendStatus(401); }
    let newInfo = req.body
    if (typeof newInfo.username !== 'undefined')
      user.username = newInfo.username
    /*if (typeof newInfo.bio !== 'undefined')
      user.bio = newInfo.bio
    if (typeof newInfo.foto !== 'undefined')
      user.foto = newInfo.foto
    if (typeof newInfo.ubicacion !== 'undefined')
      user.ubicacion = newInfo.ubicacion
    if (typeof newInfo.telefono !== 'undefined')
      user.telefono = newInfo.telefono*/
    if (typeof newInfo.password !== 'undefined')
      user.createPassword(newInfo.password)
    user.save().then(updatedUser => {
      res.status(201).json(updatedUser.publicData())
    }).catch(next)
  }).catch(next)
  
}

//DELETE USER
function deleteUser(req, res, next) {

  //User.findOneAndDelete({_id:req.user.id}) //WHEN USING AUTH
  User.findOneAndDelete({_id:req.params.id})
	.then(r => {
		res.status(200).send(`User ${req.params.id} was succesfully deleted: ${r}`)
	})
	.catch(next)
}

///////////////TO BE USED IN THE FUTURE////////////////

//USER LOGIN
/*function loginUser(req, res, next){
	if (!req.body.email || !req.body.password){
		return res.status(422).json({errors : {email : "Info missing"}})
	}

	passport.authenticate('local',
		{ session: false },
		function (err, user, info){
			if (err){ return next(err)}
			if (user) {
				user.token = user.generateJWT();
			} else {
				return res.status(422).json(info);
			}
		})(req, res, next)
}*/

////////////////////////////////////////////////////////


// exporting defined function
module.exports = {
  createUser,
  getUsers,
  modifyUser,
  deleteUser
  //,loginUser
};
