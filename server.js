//initialize server
const express = require('express');
const postsRouter = require('./routes/posts-routes');
const server = express();

//middleware
server.use(express.json());

//reduce the url in the route handlers
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send('<h1>Test Test 1 2 3</h1>')
})


module.exports = server;