module.exports = class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(obj) {
    const errors = [];

    for (let field of Object.keys(this.rules)) {
      const rules = this.rules[field];

      const value = obj[field];

      const type = typeof value;

      if (type !== rules.type) {
        errors.push({ field, error: `expect ${rules.type}, got ${type}` });
        return errors;
      }
      if (typeof rules.min !== 'number') {
        errors.push({ field, error: `expect ${rules.min} to be a number` });
        return errors;
      } else if (typeof rules.max !== 'number') {
        errors.push({ field, error: `expect ${rules.max} to be a number` });
        return errors;
      }

      switch (type) {
        case 'string':
          if (value.length < rules.min) {
            errors.push({
              field,
              error: `too short, expect ${rules.min}, got ${value.length}`,
            });
          }
          if (value.length > rules.max) {
            errors.push({
              field,
              error: `too long, expect ${rules.max}, got ${value.length}`,
            });
          }
          break;
        case 'number':
          if (value < rules.min) {
            errors.push({
              field,
              error: `too little, expect ${rules.min}, got ${value}`,
            });
          }
          if (value > rules.max) {
            errors.push({
              field,
              error: `too short, expect ${rules.min}, got ${value.length}`,
            });
          }
          break;
        default:
          errors.push({ field, error: `${type} is unsupported` });
          return errors;
          break;
      }
    }

    return errors;
  }
};
