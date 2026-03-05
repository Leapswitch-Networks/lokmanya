const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cors = require('cors');
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://lokmanyahospitals.com/*',
    'https://www.lokmanyahospitals.com/*',
    'http://localhost:5000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.port || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    cors(corsOptions)(req, res, async () => {
      try {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        if (pathname === '/a') {
          await app.render(req, res, '/a', query);
        } else if (pathname === '/b') {
          await app.render(req, res, '/b', query);
        } else {
          await handle(req, res, parsedUrl);
        }
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
