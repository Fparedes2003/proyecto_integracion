
const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const loginController = require('../controllers/loginController');
//Se crea una constante llamada loginController la cual utiliza un modulo ubicado en la carpeta controllers
app.use(express.static(path.join('public')));

router.get('/adm', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '..','public', 'loginadm.html'));
})
//Cuando el administrador vaya a la ruta /login/adm se le mostrara el archivo loginadm.html que se encuentra en la carpeta public

router.get('/usuario', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '..', 'public', 'loginusuario.html'));
})
//Lo mismo pasa con usuario al cual se le mostrara loginusuario.html

router.post('/usuario/iniciar', loginController.confirmarLoginUsuario);
//Una ves el usuario intente iniciar sesion se ejecutara el metodo confirmarLoginUsuario de loginController
router.post('/adm/iniciar', loginController.confirmarLoginAdm);
//Una ves el usuario intente iniciar sesion se ejecutara el metodo confirmarLoginAdm de loginController

module.exports = router;
//Se exporta la instancia router
