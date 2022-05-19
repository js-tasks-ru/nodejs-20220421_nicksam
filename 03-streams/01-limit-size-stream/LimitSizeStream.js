const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.length = 0;
  }

  _transform(chunk, encoding, callback) {
    this.length += Buffer.byteLength(chunk);
    if (this.length > this.limit) callback(new LimitExceededError(), null);
    else callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
