// CRUD Structure
const router = require('express').Router();
const {
  createUser,
  getUsers,
  modifyUser,
  deleteUser
} = require('../controllers/users')

router.get('/', getUsers)
router.get('/:id', getUsers)
router.post('/', createUser)
router.put('/:id', modifyUser)
router.delete('/:id', deleteUser)

module.exports = router;