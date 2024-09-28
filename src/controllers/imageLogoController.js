
const path = require('path');
const fs = require('fs');

// Función para obtener la URL de una imagen
module.exports.imageLogo = (req, res) => {
    const { imageName } = req.body;

    if (!imageName) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/logo_error.jpg`;
        return res.status(400).send({ 
            error: 'No se proporcionó el nombre de la imagen.',
            url: imageUrl 
        });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', imageName); // Ajustar la ruta

    // Verificar si la imagen existe
    if (!fs.existsSync(imagePath)) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/logo_error.jpg`;
        return res.send({ url: imageUrl }); // Agregar return para terminar la ejecución
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;
    res.send({ url: imageUrl });
};


