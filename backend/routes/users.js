const router = require('express').Router();
const validate = require('../middleware/validate');
const {userSchema} = require ('../Validation/authValidation')
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/add').post(validate(userSchema),createUser);
router.route('/:id').delete(deleteUser);
router.route('/update/:id').put(validate(userSchema),updateUser);

module.exports = router;
