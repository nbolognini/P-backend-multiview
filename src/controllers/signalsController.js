const connection = require('../models/conecction')

module.exports.signals = (req, res) => {
    console.log('Intentando acceder a /signals');
    // Verificar el estado de la conexión
    if (connection.state === 'disconnected') {
        console.log('La conexión a la base de datos está cerrada.');
        res.status(500).send('Internal Server Error: DB connection closed');
        return;
    }
    connection.query('SELECT * FROM signals', (err, rows) => {
        if (err) {
            console.error('Error querying database:', err); // Mostrar el error específico
            res.status(500).send('Error querying database');
            return;
        }
        console.log('Señales consultados con éxito:', rows.length);
        res.json(rows); // Enviar array con resultados como respuesta en formato JSON
    });
};
