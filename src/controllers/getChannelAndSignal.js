const connection = require('../models/conecction');

module.exports.getChannelAndSignal = (req, res) => {
    // Desestructurar el objeto req.body para obtener el user_name_id
    const { user_name_id } = req.body;
    
    console.log('Intentando acceder a /getChannelAndSignal');
    // Verificar el estado de la conexión
    if (connection.state === 'disconnected') {
        console.log('La conexión a la base de datos está cerrada.');
        res.status(500).send('Internal Server Error: DB connection closed');
        return;
    }

    // Consulta SQL de un solo paso
    const query = `
        SELECT c.channel_id, c.channel_name, m.signal_type, s.signal_url, m.multiview_order
        FROM users u
        JOIN groups g ON u.fk_group_id = g.group_id
        JOIN multiview m ON g.group_id = m.fk_group_id
        JOIN channels c ON m.fk_channel_id = c.channel_id
        JOIN signals s ON m.fk_channel_id = s.fk_channel_id AND m.signal_type = s.signal_type
        WHERE u.user_name_id = ?
        AND u.user_status = 1
        AND g.group_status = 1
        AND m.multiview_status = 1
        AND s.signal_status = 1
        AND c.channel_status = 1
        ORDER BY m.multiview_order
`;

    connection.query(query, [user_name_id], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err); // Mostrar el error específico
            res.status(500).send('Error querying database');
            return;
        }

        if (rows.length === 0) {
            res.status(404).send('No entries found for the given user');
            return;
        }

        console.log('Consulta realizada con éxito:', rows.length);
        res.json(rows); // Enviar array con resultados como respuesta en formato JSON
    });
};