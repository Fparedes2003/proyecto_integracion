const express = require('express');
const router = express.Router();
//se crea una instancia llamada router la cual utiliza los metodos de express Router
const admController = require('../controllers/admController');
//se crea una constante llamada admController la cual va a utilizar un modulo ubicado en controllers
router.get('/', (req, res)=>{
    res.render('home');
})
//Este router con metodo http get establece que cuando el usuario vaya a la ruta /adm se mostrara al usuario la vista home
router.get('/crearusuario', (req, res)=>{
    res.render('crearusuario');
})
//Cuando el usuario vaya a la ruta /adm/crearusuario se le llevara a la vista crearusuario

router.get('/eliminarusuario', admController.mostrarUsuario);
//Cuando el administrador vaya a la ruta /adm/eliminarusuario router.get ejecutara un metodo configurado en el admController llamado mostrarUsuario

router.get('/actualizarusuario', (req, res)=>{
    res.render('modificarUsuario');
})
//Cuando el administrador vaya a la ruta /adm/actualizarusuario se le mostrara la vista modicarUsuario

router.get('/reportes', (req, res)=>{
    res.render('reportes');
})
//Cuando el administrador vaya a la ruta /adm/reportes se le mostrara la vista reportes
router.get('/crearreportes', (req, res)=>{
    res.render('crearReporte');
})
//Cuando el usuario vaya a la ruta /adm/crearreportes se le mostrara la vista crearReporte

router.get('/crearusuario/confirmacion', (req, res)=>{
    res.render('confirmacion');
})
//Cuando el administrador vaya a la ruta /adm/crearusuario/confirmacion se le mostrara la vista llamada confirmacion

router.get('/reportes/atrasadas', admController.atrasos);
//Cuando el administrador vaya a la ruta /adm/reportes/atrasadas se ejecutara el metodo atrasos de admController
router.get('/reportes/anticipadas', admController.anticipadas);
//Cuando el administrador vaya a la ruta /adm/reportes/anticipadas se ejecutara el metodo anticipadas de admController
router.get('/reportes/inasistencias', admController.verInasistencias);
//Cuando el administrador vaya a la ruta /adm/reportes/inasistencias se ejecutara el metodo verInasistencias de admController
router.get('/verLicencias', admController.verLicencias);

router.post('/crearusuario', admController.postUsuario);
//Router con metodo http POST el cual lleva la ruta de /adm/crearusuario cuando se ejecuta este router 
//Se ejecutara el metodo postUsuario de admController y lo mismo con los demas

router.post('/eliminarusuario', admController.deleteUsuario);

router.post('/crearreporte', admController.crearReporte);

router.post('/aceptarLicencia', admController.aceptarLicencias);

router.post('/actualizarusuario', admController.actualizarUsuario);

module.exports = router;
//Se exporta la instancia router