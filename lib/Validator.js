const { getCaster } = require('./types');
module.exports = class Validator {
  constructor(field, { type, required }) {
    this.field = field;
    this.type = type;
    this.required = required;
    this.caster = getCaster(type);
  }

  validate(obj) {
    const val = obj[this.field];
    if(this.required && !val) throw new Error(`${this.field} is required`);
    if(!this.required && !val) return null;

    return this.caster(val);
  }
};
