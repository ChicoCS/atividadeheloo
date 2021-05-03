const Sequilize = require('sequelize');

const sequelize = new Sequelize('dbproject', 'root', '12345', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function () {
    console.log("conectado")
}).catch(function (erro) {
    console.log("falhou" + erro)
})