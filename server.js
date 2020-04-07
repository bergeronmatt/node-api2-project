//initialize server
const express = require('express');
const server = express();
//const postsRouter = require('./route/posts-router.js');

//middleware
server.use(express.json());

//endpoints
server.get('/', (req, res) => {
    res.send(`<h1>API Node Project 2</h1>`)
});


module.exports = server;