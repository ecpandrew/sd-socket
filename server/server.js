const service = require('./DAO/Service.js');
const { v4: uuidv4 } = require('uuid');
service.populate();
const net = require('net');
const port = 29298;

const comandos = [
    {id: 1, comando: "Listar Todas Estalagens", exemplo: "1"},
    {id: 2, comando: "Listar Estalagens Disponíveis", exemplo: "2;2020-12-02T03:24:00;2020-12-05T03:24:00"},
    {id: 3, comando: "Cadastrar Estalagem", exemplo: "3;André Cardoso;Um belo quarto;80RS"},
    {id: 4, comando: "Reservar Estalagem", exemplo: "4;uuid;Locador;2020-12-02T03:24:00;2020-12-05T03:24:00"},
    {id: 5, comando: "Alugar Estalagem", exemplo: " 5;uuid;Locador;2020-12-02T03:24:00;2020-12-05T03:24:00"}

];

var server = net.createServer();

server.on('connection', function (socket) {
    socket.write("Olá cliente "+ socket.remotePort +". Você se conectou em: "+ new Date()+"\n");

    comandos.forEach((item) => {
        socket.write(`\nPressione ${item.id} para ${item.comando}. Exemplo: ${item.exemplo}`)
    });


    socket.on('data', (data)=>{
        console.log("Received: "+ data);
        var command = data.toString().split(";");
        console.log(command);

        if(command[0] === "1"){
            // console.log(service.listarEstalagens());
            socket.write(service.listarEstalagens());
        }
        else if (command[0] === "2") {
            socket.write(service.listarEstalagensDispiniveis(Date.parse(command[1]), Date.parse(command[2])));
        }
        else if(command[0] === '3'){
            service.cadastrarEstalagem("8c2733e3-e6f5-4ccf-8b42-dcd11f6a101a",command[1], command[2], command[3]);
            socket.write("Cadastrado!")
        }
        else if(command[0] === '4'){
            service.reservarEstalagem(command[1], command[2], Date.parse(command[3]), Date.parse(command[4]));
            socket.write("Reservado!")
        }
        else if(command[0] === '5'){
            service.alugarEstalagem(command[1], command[2], Date.parse(command[3]), Date.parse(command[4]));
            socket.write("Alugado!")
        }

    })
});


// server.on('data', function (data) {
//
// });

server.listen(port);

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
