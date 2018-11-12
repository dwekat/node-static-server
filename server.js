require('dotenv').config();

const connect = require('connect');
const http = require('http');
const https = require('https');
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');

const HttpPrt = process.env.HTTP_PORT || 3000;
const HttpsPort = process.env.HTTPS_PORT || 3001;

const httpsOptions = {
    key:    fs.readFileSync('ssl/server.key'),
    cert:   fs.readFileSync('ssl/server.crt')
};

const app = connect()
    .use(serveStatic(path.join(__dirname, 'public_html')));

http.createServer(app).listen(HttpPrt, () => console.log(`Server running on ${HttpPrt}`));

if (!!process.env.HTTPS_PORT)
    https.createServer(httpsOptions, app).listen(HttpsPort, () => console.log(`Server running on ${HttpsPort}`));


