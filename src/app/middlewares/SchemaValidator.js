/**
 * Validates the request content according to a given schema and request property.
 * @param {*} schema - The validation schema
 * @param {*} property - Request property (body, query or params) to be validated
 */
const schemaValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const isValid = error == null;

    // Verify if validation failed
    if (!isValid) {
      const errorDetails = error.details
        // Remove double quotes from fields returned by error.details
        // Ex: "\"field\" is required", becomes: "field is required", in response message
        .map(detail => detail.message.replace(/['"]/g, ''))
        .join(',');

      return res.status(422).json({
        message: 'Validation failed',
        error: errorDetails,
      });
    }

    // Validation successfull, continue to next middleware
    return next();
  };
};

export default schemaValidator;
