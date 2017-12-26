const BadRequestError = require('../errors/bad-request-error');

class BaseValidator {
  checkFields(fields, data) {
    const missingFields = fields
      .filter(x => x.required && !data[x.name])
      .map(x => `Field '${x.name}' is required`);

    const allowedFields = fields.map(x => x.name);
    const extraFields = Object.keys(data)
      .filter(x => !allowedFields.includes(x))
      .map(x => `Field '${x}' is not allowed`);
    
    const allErrors = missingFields.concat(extraFields);

    if (allErrors.length) {
      const message = `Bad request: ${allErrors.join(', ')}`;
      throw new BadRequestError(message);
    }
  }
}

module.exports = BaseValidator;