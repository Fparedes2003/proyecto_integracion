const Empleado = require('../models/empleados');
const bcryptjs = require('bcryptjs');
const express = require('express');
const path = require('path');
const app = express();

const compare = async(pass, passHash) =>{
    return await bcryptjs.compare(pass, passHash);
}
//Se crea un metodo el cual compara la contraseña que escribio el usuario
//Con la contraseña hasheada o encryptada que se encuentra en la base de datos
exports.confirmarLoginUsuario = async function (req, res){
    const {correo, pass} = req.body;
    const usuario = await Empleado.findOne({where:{correo}});
    if(!usuario){
        console.log('Correo no encontrado');
    }
    const verificarPass = await compare(pass, usuario.PASSWORD);
    if(verificarPass){
        res.sendFile(path.resolve(__dirname, '..', 'public', 'usuario.html'));
    }
}
//Se exporta el metodo confirmarLoginUsuario el cual recibe el correo y la contraseña que el empleado escribio en la pagina de login
//Luego se busca el correo en la base de datos y se declara un if el cual dice que si el usuario no existe se mostrara en consola
//Correo no encontrado
//si este if no se ejecuta se usa el metodo compare definido anteriormente 
//Si la comparacion es correcta se envia al usuario al archivo usuario.html
exports.confirmarLoginAdm = async function (req, res){
    const {correo, pass} = req.body;
    const adm = await Empleado.findOne({where:{correo:'ysola@gmail.com'}});
    if(!adm){
        console.log('El correo del adm no fue encontrado');
    }
    const verificarPass = await compare(pass, adm.PASSWORD);
    if(verificarPass){
        res.render('home');
    }
}
//En confirmarLoginAdm pasa algo similar la unica diferencia
//Es que solo un empleado podra logearse aca junto con su contraseña