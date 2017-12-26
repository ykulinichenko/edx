const BaseValidator = require('./base-validator');

const fields = [
  {
    name: 'text',
    required: true
  }
]

class CommentValidator extends BaseValidator {
  validateCreate(data) {
    this.checkFields(fields, data);
  }

  validateUpdate(data) {
    this.checkFields(fields, data);
  }
}

module.exports = new CommentValidator();