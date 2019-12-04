const Props = require('./Validator');

module.exports = class Schema {
  constructor(schema) {
    this.schema = schema;
    this.props = Object.entries(schema)
      .map(([field, options]) => new Props(field, options));

  }
  objectToValidate(obj) {
    const objectValidated = {};
    const errors = [];
    this.props
      .forEach(validator => {
        try {
          objectValidated[validator.field] = validator.objectToValidate(obj);
        } catch(err) {
          errors.push(err);
        }
      });
    if(errors.length > 0) {
      throw new Error(`invalid schema >> ${errors}`);
    }
    return objectValidated;
  }
};


