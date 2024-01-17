const connection = require('../models/conecction')
const jwt = require('jsonwebtoken');

module.exports.validate = (req, res) => {
    const { username, password, role } = req.body;
    const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

    try {
        connection.query(consult, [username, password, role], (err, result) => {
            if (err) {
                return res.send({message: 'Error de user/pass', error: err});
            }

            if (result.length > 0) {
                const token = jwt.sign({ username }, 'Stack', { expiresIn: '20m' });
                //Acá generé la const role para agarre los datos traido de la base de datos
                const role = result[0].role;
                console.log(role);
                //Si encuentro el user y el pass, devuelvo el token
                //El user lo devuelve al front, pero no el role ¿?
                return res.send({username, role, token });
            } else {
                console.log('Usuario o contraseña incorrectos');
                //Si no encuentro el user y el pass, devuelvo undefined
                return res.send(undefined);
            }
        });
    } catch (e) {  
        // manejar el errorrrr
    }
}

