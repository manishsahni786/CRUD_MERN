const express = require('express');
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
router.route('/add').post(createExercise);
router.route('/user/:userId').get(getExercisesByUserId);
router.route('/:id').get(getExerciseById);
router.route('/:id').delete(deleteExercise);
router.route('/update/:id').put(updateExercise);

module.exports = router;
