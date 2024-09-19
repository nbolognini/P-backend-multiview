
const mysql = require('mysql');
const connection = mysql.createConnection({

    host: '192.168.0.54',
    user: 'usuario',
    password: 'abcd1234',
    database: 'multiview'
});

connection.connect(function (error) {
    if (error) throw error;
    console.log('Conectado a la base de datos');
});

module.exports = { connection };

module.exports = connection;
