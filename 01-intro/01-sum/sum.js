function sum(a, b) {
  if (typeof a != 'number' || typeof b != 'number')
    throw new TypeError('Входящие Аргументы должны быть числами.');
  else return a + b;
}

module.exports = sum;
