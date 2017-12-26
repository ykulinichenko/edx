const BaseSelector = require('./base-selector');

const fields = ['id', 'name', 'text', 'url'];

class PostSelector extends BaseSelector {
  select(data) {
    return this.selectFields(fields, data);
  }
}

module.exports = new PostSelector();