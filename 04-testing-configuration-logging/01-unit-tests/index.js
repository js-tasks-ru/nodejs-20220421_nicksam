const validator = require('./Validator');

const valid = new validator({
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

const errors = valid.validate({ name: 'Nickolay', age: 5 }); // { field: 'name', error: 'too short, expect 5, got 2' },
// { field: 'age', error: 'too little, expect 18, got 5' }
//const errors = valid.validate({ fds: 'La', gfd: 5 });
//errors [ { field: 'name', error: 'expect string, got undefined' } ]

console.log('errors', errors);
