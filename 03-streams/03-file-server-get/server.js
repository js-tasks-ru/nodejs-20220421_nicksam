const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
var urllib = require('url');

const server = new http.Server();

const errorHandler = (err, res) => {
  if (err.code == 'ENOENT') {
    res.statusCode = 404;
    res.end(err.message);
  }
};
const checkPath = (path, res) => {
  if (path.includes('/')) {
    res.statusCode = 400;
    res.end('Вложенность недопустима');
  }
};
server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  checkPath(pathname, res);
  const filepath = path.join(__dirname, 'files', pathname);
  //
  switch (req.method) {
    case 'GET':
      const fileStream = fs
        .createReadStream(filepath)
        .on('error', (err) => errorHandler(err, res))
        .pipe(res)
        .on('error', (err) => errorHandler(err, res));

      req.on('aborted', () => {
        fileStream.destroy();
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
