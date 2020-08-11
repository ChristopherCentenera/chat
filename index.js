const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const express = require('express');

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    })
})

http.listen(3001,() => {
    console.log('Listening on port 3001');
});
