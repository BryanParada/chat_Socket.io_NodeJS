var express = require('express');
var app = express();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});
var puerto = 6677;

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send("Hola mundo desde una ruta");
})

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS de Bryan Parada',
    nickname: 'Bot - Bryan'
}];

io.on('connection', function(socket){
    console.log("El cliente/nodo con IP: " + socket.handshake.address + " se ha conectado");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(puerto, function(){
    console.log("Servidor está funcionando en http:localhost:"+puerto);
});

//npm start para lanzar el server!
//nodemon server/index.js para lanzar el server!