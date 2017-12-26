const BaseValidator = require('./base-validator');

const fields = [
  {
    name: 'name',
    required: true
  },
  {
    name: 'url',
    required: true
  },
  {
    name: 'text',
    required: true
  }
]

class PostValidator extends BaseValidator {
  validateCreate(data) {
    this.checkFields(fields, data);
  }

  validateUpdate() {
    this.checkFields(fields, data);
  }
}

module.exports = new PostValidator();