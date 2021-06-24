const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
                cors:{
                    origin: 'http://localhost:3001'
                }
            });

const port = 5000;

require('./src/socket')(io);

server.listen(port, () => {
  console.log(`listening on *: ${port}`);
});