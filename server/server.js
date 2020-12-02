
const user = require("./DAO/User.js");
const estalagem = require("./DAO/Estadia.js");
const net = require('net');
const JsonSocket = require('json-socket');
const port = 29298;


var clientes = [];

function createServerProtocolMessage(type, object) {
    return {type: type, data: object, sender: "SERVER"};
}


var server = net.createServer();
server.listen(port);

server.on("connection", function (socket) {
    socket = new JsonSocket(socket);


    socket.on('message', function (message) {
        socket.sendMessage(createServerProtocolMessage("connACK", "Hello "+message.sender.name));
        socket.id = message.sender;
        clientes.push(socket);
        console.log("\nCliente "+message.sender.name +" esta conectado!");
    });

    socket.on('end', function () {
        console.log("Cliente "+ socket.id.name+ " desconectou!");
        clientes.splice(clientes.indexOf(socket), 1);
    });

    socket.on('error', function () {
        clientes.splice(clientes.indexOf(socket), 1);
        console.log("Cliente "+ socket.id.name+ " desconectou devido a um erro!")
    });

    socket.sendMessage(
        {type: "options", cadastrar_estalagem: 1, listar_estalagens_disponiveis : 2, reservar_estalagem: 3})
});

server.on("message", function (socket) {
    socket = new JsonSocket(socket);

    if(message.type === "cadastrar_estalagem"){
        estalagem.cadastrarEstalagem(message.sender, message.data.descricao, message.data.diaria);
        socket.sendMessage(createServerProtocolMessage("cadastrar_estalagem_ACK", "Cadastrado com sucesso!"));
    }

    if(message.type === "listar_estalagens"){
        const lista = estalagem.listarEstalagens();
        socket.sendMessage(createServerProtocolMessage("listar_estalagem_ACK", lista));

    }
});








console.log("Servidor escutando a porta: "+port+"\n");


// net.createServer( function (socket){
//     socket.name = socket.remoteAddress+":"+socket.remotePort;
//     clientes.push(socket);
//     socket.write(socket.name + " conectado\n", socket);
//
//
//     socket.on("data", function (data) {
//         console.log(data.toString())
//
//     });
//
//
//
//
//
//
//
//     // Trata a desconexao do cliente
//     socket.on("end", function () {
//         clientes.splice(clientes.indexOf(socket), 1);
//         broadcast(socket.name + " Desconectou\n");
//     });
//
//     socket.on("error", function () {
//         console.log("\n Cliente desconectado por erro!");
//         clientes.splice(clientes.indexOf(socket),1)
//     })
// }).listen(port);




















// var person = user.newPerson("andre","andre@gmail.com");
// var person2 = user.newPerson("daniela","daniela@gmail.com");
//
// // console.log(person);
//
// estalagem.cadastrarEstalagem(person, 'Quarto 2 camas solteiro 1 banheiro', '100');
// estalagem.cadastrarEstalagem(person, 'Quarto 1 cama casal 1 banheiro', '150');
// estalagem.cadastrarEstalagem(person, 'Quarto 1 cama solteiro', '60');
//
//
// estalagem.alugarEstalagem(1, person2);
//
// console.log(estalagem.listarEstalagens())
//
