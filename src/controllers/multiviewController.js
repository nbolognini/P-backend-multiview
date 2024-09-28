const connection = require('../models/conecction');

module.exports.multiview = (req, res) => {
    // Desestructurar el objeto req.body para obtener el fk_group_id
    const { fk_group_id } = req.body;
    
    console.log('Intentando acceder a /multiview');
    // Verificar el estado de la conexión
    if (connection.state === 'disconnected') {
        console.log('La conexión a la base de datos está cerrada.');
        res.status(500).send('Internal Server Error: DB connection closed');
        return;
    }

    const query = `
        SELECT c.channel_name, m.signal_type, s.signal_url, m.multiview_order
        FROM multiview m
        JOIN groups g ON m.fk_group_id = g.group_id
        JOIN signals s ON m.fk_channel_id = s.fk_channel_id AND m.signal_type = s.signal_type
        JOIN channels c ON m.fk_channel_id = c.channel_id
        WHERE m.fk_group_id = ?
          AND g.group_status = 1
          AND m.multiview_status = 1
          AND s.signal_status = 1
          AND c.channel_status = 1
        ORDER BY m.multiview_order
    `;

    connection.query(query, [fk_group_id], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err); // Mostrar el error específico
            res.status(500).send('Error querying database');
            return;
        }
        console.log('Multiview Order consultados con éxito:', rows.length);
        res.json(rows); // Enviar array con resultados como respuesta en formato JSON
    });
};