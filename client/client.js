var net = require('net');
var port = 29298;
var host = '127.0.0.1';


const user = "Paulo Rogerio";
var client = new net.Socket();

client.connect(port, host, function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');

});

client.on("data", (data) => {
    console.log(`\n\nData received: ${data.toString()}`);
});


setTimeout(function () { // LIstar todas
    client.write(`1`)
}, 1000);


setTimeout(function () { // Cadastrart um quarto
    client.write('3;Rafael Fernandes; Quarto de casal;280US');
}, 2000);

setTimeout(function () { // Listar para verificar se deu certo
    client.write("1")
}, 3000);

setTimeout(function () { // reservar o quarto adicionado em uma data
    client.write('4;"8c2733e3-e6f5-4ccf-8b42-dcd11f6a101a";Paulo Rogerio;2020-12-02T03:24:00;2020-12-07T03:24:00')
}, 4000);


setTimeout(function () { // alugar um quarto qualquer na mesma data
    client.write(`5;29c1f09e-c58d-473e-b88a-66d148e6e307;Paulo Rogerio;2020-12-02T03:24:00;2020-12-07T03:24:00`)
}, 5000);

setTimeout(function () {  // listar disponiveis, deve aparecer todos menos esses 2
    client.write(`2;2020-12-02T03:24:00;2020-12-07T03:24:00`)
}, 6000);


// setTimeout(function () { // listar tudo
//     client.write(`1`)
// }, 7000);



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