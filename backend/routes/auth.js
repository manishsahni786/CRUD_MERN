const express = require('express');
const { signup, login } = require('../controllers/authController');
const { signupSchema, loginSchema } = require('../Validation/authValidation');
const validate = require('../middleware/validate');


const router = express.Router();

// Route for signup with validation middleware  
router.post('/signup', validate(signupSchema), signup);

// Route for login with validation middleware
router.post('/login', validate(loginSchema), login);

module.exports = router;
