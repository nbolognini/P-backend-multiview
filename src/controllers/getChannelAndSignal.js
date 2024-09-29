const connection = require('../models/conecction');

module.exports.getChannelAndSignal = (req, res) => {
    const userNameId = req.body.user_name_id;

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

    connection.ping((pingErr) => {
        if (pingErr) {
            console.error('Error pinging database:', pingErr);
            res.status(500).send('Error pinging database');
            return;
        }

        connection.query(query, [userNameId], (err, rows) => {
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
    });
};