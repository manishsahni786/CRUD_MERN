const router = require('express').Router();
const { getAllExercises, createExercise, getExerciseById, deleteExercise, updateExercise } = require('../controllers/exerciseController');

router.route('/').get(getAllExercises);
router.route('/add').post(createExercise);
router.route('/:id').get(getExerciseById);
router.route('/:id').delete(deleteExercise);
router.route('/update/:id').post(updateExercise);

module.exports = router;
