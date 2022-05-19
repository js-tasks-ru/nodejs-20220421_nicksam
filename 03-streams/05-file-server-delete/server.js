const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const errorHandler = (err, res) => {
  if (err.code == 'ENOENT') {
    res.statusCode = 404;
    res.end(err.message);
  } else if (err.code == 'LIMIT_EXCEEDED') {
    res.statusCode = 413;
    res.end(err.message);
  } else if (err.code == 'EEXIST') {
    res.statusCode = 409;
    res.end(err.message);
  } else {
    res.statusCode = 500;
    res.end(err.message);
  }
};

const checkPath = (path, res) => {
  if (path.includes('/')) {
    res.statusCode = 400;
    res.end('Вложенность недопустима');
  }
};

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  checkPath(pathname, res);
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      fs.unlink(filepath, (err) => {
        if (err) errorHandler(err, res);
        else res.end();
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
