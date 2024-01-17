const connection = require('../models/conecction')

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

    try {
        connection.query(consult, [username, password], (err, result) => {
            if (err) {
                return res.send({message: 'Error de user/pass', error: err});
            }

            if (result.length > 0) {
                console.log(result);
                return res.send({message: 'Bienvenido', data: result});
            } else {
                console.log('Usuario o contraseña incorrectos');
                return res.send({message: 'Usuario o contraseña incorrectos'});
            }
        });
    } catch (e) {  
        // FUNCIONA OK!!!
    }
}

