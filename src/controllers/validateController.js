const connection = require('../models/conecction')
const jwt = require('jsonwebtoken');

module.exports.validate = (req, res) => {
    const { username, password, role } = req.body;
    // SI cambio paratros, o el nombre de la tabla, lo cambio en la variable consult
    const consult = 'SELECT * FROM users WHERE user_name_id = ? AND user_password = ?';

    try {
        connection.query(consult, [username, password, role], (err, result) => {
            if (err) {
                return res.send({message: 'Error de user/pass', error: err});
            }

            if (result.length > 0) {
                //Si encuentro el user y el pass, verifico que user_status sea 1
                if (result[0].user_status === 0) {
                    console.log('Usuario inactivo');
                    //Si retorna 0, devuelvo undefined al front para que no pueda loguearse
                    return res.send(undefined);
                }
                else {
                    console.log('Usuario activo');
                    const token = jwt.sign({ username }, 'Stack', { expiresIn: '20m' });
                    //Acá generé la const role para agarre los datos traido de la base de datos
                    const role = result[0].user_role;
                    console.log(role);
                    //Si encuentro el user y el pass, devuelvo el token
                    //Devuelvo el user, el role y el token
                    return res.send({username, role, token });
                }
                
            } else {
                console.log('Usuario o contraseña incorrectos');
                //Si no encuentro el user y el pass, devuelvo undefined
                return res.send(undefined);
            }
        });
    } catch (e) {  
        // manejar el errorrrr
        return res.send(undefined);
    }
}

