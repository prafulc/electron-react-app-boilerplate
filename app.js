const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
require('dotenv').config();


const server = express();
const DIST_DIR = path.join(__dirname, 'dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(express.static(path.join(__dirname, 'public')));

// var webpack = require('webpack');

// var compiler = webpack(require('./webpack.config.js'));
// server.get('*', function (req, res) {
//     const filename = path.resolve(compiler.outputPath, 'index.html');
//     compiler.outputFileSystem.readFile(filename, (err, result) => {
//         if (err) {
//             return next(err);
//         }
//         res.set('content-type', 'text/html');
//         res.send(result);
//         res.end();
//     });
// });

server.get('/', function (req, res) {
    res.send("Hello world! Lala Seth is here!");
});

server.get('/api/data', function (req, res) {
    res.status(200).json({ a: [1,2,3,4,5], b: 'test', url: '/api/data' });
});

try {
    server.listen(process.env.PORT || 3000, () => {
        console.log('Server is ON.');
    });
} catch (e) {
    console.log(e)
}

module.exports = server;