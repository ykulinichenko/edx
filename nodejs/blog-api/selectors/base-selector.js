class BaseSelector {
  selectFields(fields, data) {
    return fields.reduce((accum, value) => {
      if (data[value]) {
        accum[value] = data[value];
      }

      return accum;
    }, {})
  }
}

module.exports = BaseSelector;