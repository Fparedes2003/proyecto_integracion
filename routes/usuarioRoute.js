const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
//Se crea una instancia llamada usuarioController la cual utiliza un modulo ubicado en el directorio controllers
router.post('/', usuarioController.entrada);
//Router con metodo post el cual ejecuta el metodo entrada de usuarioController
router.post('/salida', usuarioController.salida);
//Router con metodo post el cual ejecuta el metodo salida de usuarioController
router.post('/inasistencia', usuarioController.inasistencia);
//Router con metodo post el cual ejecuta el metodo inasistencia de usuarioController
router.post('/licencia', usuarioController.licencia);
//Router con metodo post el cual ejecuta el metodo licencia de usuarioController
module.exports = router;