const Exercise = require('../models/exercise.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Fetch all exercises
exports.getAllExercises = (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Create a new exercise (now using userId)
exports.createExercise = async (req, res) => {
  const { username, description, duration, date } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json('User not found.');
    }

    // Create a new exercise with the user's userId and username
    const newExercise = new Exercise({
      userId: user._id,  // Assign userId from the User document
      username: user.username, // Keep the username as well
      description,
      duration: Number(duration),
      date: Date.parse(date),
    });

    // Save the new exercise to the database
    await newExercise.save();
    res.json('Exercise added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Fetch exercises by userId
exports.getExercisesByUserId = (req, res) => {
  const userId = req.params.userId;

  Exercise.find({ userId })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Fetch exercise by ID
exports.getExerciseById = (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Delete an exercise by ID
exports.deleteExercise = (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Update an exercise by ID
exports.updateExercise = (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (!exercise) return res.status(404).json('Exercise not found.');

      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

// Fetch all users associated with a specific exercise description
exports.getUsersByExerciseDescription = async (req, res) => {
  const { description } = req.body; // Extract description from req.body

  try {
    // Find all exercises with the matching description
    const exercises = await Exercise.find({ description });

    // If no exercises are found, return a 404 response
    if (!exercises.length) {
      return res.status(404).json({ message: 'No exercises found with the given description.' });
    }

    // Extract unique user IDs from the exercises
    const userIds = [...new Set(exercises.map(ex => ex.userId))];

    // Find the users associated with these user IDs
    const users = await User.find({ _id: { $in: userIds } });

    // Return the list of users as a response
    res.json({ exerciseDescription: description, users });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};