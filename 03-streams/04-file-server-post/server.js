const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const server = new http.Server();

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

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  checkPath(pathname, res);
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      const fileStream = fs.createWriteStream(filepath, { flags: 'wx' });
      const limitPipe = new LimitSizeStream({
        limit: 10000,
        encoding: 'utf-8',
      });
      req
        .on('aborted', () => {
          fileStream.destroy();
          fs.unlink(filepath, () => {});
          res.end();
        })
        .pipe(limitPipe)
        .on('error', (err) => {
          fileStream.destroy();
          fs.unlink(filepath, () => {});
          errorHandler(err, res);
        })
        .pipe(fileStream)
        .on('error', (err) => {
          errorHandler(err, res);
        })
        .on('finish', () => {
          res.statusCode = 201;
          res.end();
        });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
