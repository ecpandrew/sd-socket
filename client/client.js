var net = require('net');
var JsonSocket = require('json-socket');
const user = require("../server/DAO/User.js");
var port = 29298;
var host = '127.0.0.1';

const usuario = user.newPerson("André Cardoso", "andre.cardoso@gmail.com");

function createUserProtocolMessage(type, object, user) {
    return {type: type, data: object, sender: user};
}


var socket = new JsonSocket(new net.Socket());
socket.connect(port, host);

socket.on('connect', function () {
    socket.sendMessage(createUserProtocolMessage("connect_message", "Olá Servidor!", usuario ));


    socket.on("message", function (message) {
        console.log(message);
    });


});


socket.on("message", function (message) {
    console.log(message);



});


// var obj = createUserProtocolMessage("listar_estalagem", {}, usuario);
// socket.sendMessage(obj);





//
// function cadastrarEstalagem(sockett, descricao, diaria) {
//     var obj = {descricao: descricao, diaria: diaria};
//     sockett.sendMessage(createUserProtocolMessage("cadastrar_estalagem", obj, usuario ));
// }
//
// function listarEstalagens(sockett) {
//     sockett.sendMessage(createUserProtocolMessage("listar_estalagem", {}, usuario ));
// }

// cadastrarEstalagem(socket,"Lindo quarto no bairro X um banheiro e frigobar", "80 RS");
// listarEstalagens(socket);