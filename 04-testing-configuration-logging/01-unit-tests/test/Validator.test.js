const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковые поля', () => {
      let validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      let errors = validator.validate({ name: 'Lalala' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too short, expect 10, got 6');

      validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 12,
        },
      });
      errors = validator.validate({ name: 'Lalalgadfgfdgfdgfdgfdgfdf' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('too long, expect 12, got 25');
    });
    it('валидатор проверяет типы данных', () => {
      let validator = new Validator({
        name: {
          type: 'object',
          min: 5,
          max: 10,
        },
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });
      let errors = validator.validate({ name: { test: 15 }, age: 5 });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('object is unsupported');

      validator = new Validator({
        name: {
          type: 'string',
          min: 2,
          max: 15,
        },
        age: {
          type: 'number',
          min: 'nicko',
          max: 'sam',
        },
      });
      errors = validator.validate({ name: 'Nickolay', age: 5 });
      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0])
        .to.have.property('error')
        .and.to.be.equal('expect nicko to be a number');
    });
  });
});
