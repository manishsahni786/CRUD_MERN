const router = require('express').Router();
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/add').post(createUser);
router.route('/:id').delete(deleteUser);
router.route('/update/:id').put(updateUser);

module.exports = router;
