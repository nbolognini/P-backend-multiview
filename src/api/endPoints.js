const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { validate } = require('../controllers/validateController');
const { signals } = require('../controllers/signalsController');
const { multiview } = require('../controllers/multiviewController');
const { signal } = require('../controllers/signalController');
const { getChannelAndSignal } = require('../controllers/getChannelAndSignal');

router.get('/ping', ping);

//Creo una ruta para el login
router.post('/login', login);

//Creo una ruta para el validate
router.post('/validate', validate);

//Creo una ruta para las señales
router.get('/signals', signals);

//Creo una ruta para multiview que recibe un dato en el body:
router.post('/multiview', multiview);

//Creo una ruta para que reciba fk_channel_id y Signal_type y devuelva signal_url de la tabla signals
router.post('/signal', signal);

router.post('/getChannelAndSignal', getChannelAndSignal);

//Tenemos que exportar nuestro modulo para que pueda ser utilizado en otro archivo
module.exports = router;