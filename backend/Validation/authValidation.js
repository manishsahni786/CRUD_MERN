const Joi = require('joi');

// Custom validation to check if a string is not only numbers
const usernameValidator = (value, helpers) => {
  if (/^\d+$/.test(value)) {
    return helpers.message('Username cannot be only numbers');
  }
  return value; // If validation passes, return the value
};

// Custom validation to ensure email does not start with numbers
const emailValidator = (value, helpers) => {
  if (/^\d/.test(value)) {
    return helpers.message('Email cannot start with a number');
  }
  return value;
};

// Separate function for custom description validation
const descriptionValidator = (value, helpers) => {
  if (value.trim().length === 0) {
    return helpers.message('Description cannot be empty or spaces only');
  }
  return value; // If validation passes, return the value
};

// Signup Validation Schema
const signupSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .required()
    .custom(usernameValidator, 'Custom Username Validation')
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
    }),

  email: Joi.string()
    .email()
    .required()
    .custom(emailValidator, 'Custom Email Validation')
    .messages({
      'string.empty': 'Email is required',
    }),

  password: Joi.string()
    .min(6) // Set the minimum length for the password
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]+$')) // Allows only alphanumeric characters (letters and numbers)
    .messages({
      'string.pattern.base': 'Password must contain only alphanumeric characters (letters and numbers)',
      'string.min': 'Password must be at least 6 characters long', // Customize message for minimum length
      'string.empty': 'Password is required',
    }),
});

// Login Validation Schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .custom(emailValidator, 'Custom Email Validation')
    .messages({
      'string.empty': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]+$')) // Allow only alphanumeric characters
    .messages({
      'string.pattern.base': 'Password must contain only alphanumeric characters',
      'string.empty': 'Password is required',
    }),
});

// User Schema
const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .required()
    .custom(usernameValidator, 'Custom Username Validation')
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
    }),
});

// Exercise Schema
const exerciseSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .required()
    .custom(usernameValidator, 'Custom Username Validation')
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
    }),
  
  description: Joi.string()
    .min(3)
    .required()
    .custom(descriptionValidator, 'Custom Description Validation')
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 3 characters long',
    }),
  
  duration: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Duration must be a number',
      'number.positive': 'Duration must be greater than 0',
      'any.required': 'Duration is required',
    }),
  
  date: Joi.date()
    .required()
    .messages({
      'date.base': 'Date must be a valid date',
      'any.required': 'Date is required',
    }),
});

module.exports = { signupSchema, loginSchema, userSchema, exerciseSchema };
