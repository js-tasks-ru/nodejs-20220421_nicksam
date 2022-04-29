const LineSplitStream = require('./LineSplitStream');
const os = require('os');

const lines = new LineSplitStream({
  encoding: 'utf-8',
});

function onData(line) {
  console.log('onData', line);
}

lines.on('data', onData);

lines.write('a');
lines.write(`b${os.EOL}c`);
lines.write(`d${os.EOL}e`);
lines.write(`f${os.EOL}`);
lines.write(
  `первая строка${os.EOL}вторая строка${os.EOL}третья строка${os.EOL}четвертая строка ${os.EOL} пятая строка`
);

lines.end();
