const express = require('express');
const validate= require('../middleware/validate');
const {exerciseSchema} = require('../Validation/authValidation')
const router = express.Router();
const {
  getUsersByExerciseDescription,  // Import the new controller function
  getAllExercises,
  createExercise,
  getExerciseById,
  deleteExercise,
  updateExercise,
  getExercisesByUserId
} = require('../controllers/exerciseController');

// Add a new route for fetching users by exercise description
router.route('/users-by-description').post(getUsersByExerciseDescription);

// Other existing routes
router.route('/').get(getAllExercises);
router.route('/add').post(validate(exerciseSchema),createExercise);
router.route('/user/:userId').get(getExercisesByUserId);
router.route('/:id').get(getExerciseById);
router.route('/:id').delete(deleteExercise);
router.route('/update/:id').put(validate(exerciseSchema),updateExercise);

module.exports = router;
