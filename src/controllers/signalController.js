const connection = require('../models/conecction');

module.exports.signal = (req, res) => {
    const { fk_channel_id, signal_type } = req.body;
    const consult = `
        SELECT s.signal_url, c.channel_name
        FROM signals s
        JOIN channels c ON s.fk_channel_id = c.channel_id
        WHERE s.fk_channel_id = ? AND s.signal_type = ?
    `;

    try {
        connection.query(consult, [fk_channel_id, signal_type], (err, result) => {
            if (err) {
                return res.send({ message: 'no hay señales', error: err });
            }

            if (result.length > 0) {
                console.log(result);
                return res.send({ message: 'URL de señal y nombre de canal encontrados', data: result });
            } else {
                console.log('Error al buscar señal');
                return res.send({ message: 'Error al buscar señal' });
            }
        });
    } catch (e) {
        console.error('Error en la consulta:', e);
        return res.status(500).send({ message: 'Error interno del servidor', error: e });
    }
};