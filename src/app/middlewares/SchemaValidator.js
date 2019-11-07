/**
 * Middleware to validate the request content according to a given schema. The schema
 * has the fields to be validated for the defined property.
 * @param {*} schema - The validation schema for certain request.
 * @param {*} property - A property contained in the request to be validated with respective
 * schema (property e.g.: body, headers, file, etc).
 */
const schemaValidator = (schema, property) => {
  return async (req, res, next) => {
    try {
      await schema[property].validate(req[property], {
        abortEarly: false,
      });

      // if validation is successful, continue to next middleware
      return next();
    } catch (err) {
      // Validation failed
      const errors = err.inner.map(({ path, message }) => ({
        field: path,
        message,
      }));

      return res.status(400).json({
        error: 'Input validation failed',
        errors,
      });
    }
  };
};

export default schemaValidator;
