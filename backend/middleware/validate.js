const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      // Extract the validation message
      const validationMessage = error.details[0].message;
      // Create a new error with a custom message
      const validationError = new Error(validationMessage);
      validationError.statusCode = 400; // Set the status code for bad request
      return next(validationError); // Pass the error to the next middleware
    }

    next(); // Proceed to the next middleware if validation passes
  };
};

module.exports = validate;
  