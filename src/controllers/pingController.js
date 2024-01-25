const connection = require('../models/conecction')

module.exports.ping = (req, res) => {    
    //res.send('Este es un mensaje Pong de nuestro servidor PING');
    const consult = 'SELECT * FROM login';

    try {
        connection.query(consult, (err, results)=>{
            console.log("Ping al Backend OK y base de datos OK")
            res.json("Ping al Backend OK y base de datos OK")
        });

    } catch (e) {

    }
}
