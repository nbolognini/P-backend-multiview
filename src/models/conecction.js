
const mysql = require('mysql');
const connection = mysql.createConnection({
<<<<<<< HEAD
    host: '192.168.0.54',
    user: 'usuario',
    password: 'abcd1234',
=======
    host: '192.168.0.29',
    user: 'root',
    password: 'eclipse',
>>>>>>> 6881163b3b681ce393c95c3c2a37b2f7e4a114f5
    database: 'multiview'
});

connection.connect(function (error) {
    if (error) throw error;
    console.log('Conectado a la base de datos');
});

module.exports = { connection };

module.exports = connection;
