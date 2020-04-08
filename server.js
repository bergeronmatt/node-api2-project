//initialize server
const express = require('express');
const postsRouter = require('./routes/posts-routes');
const server = express();

//middleware
server.use(express.json());

//reduce the url in the route handlers
server.use('/api/posts', postsRouter)


module.exports = server;