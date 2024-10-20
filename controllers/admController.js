const Empleado = require("../models/empleados");
const bcryptjs = require('bcryptjs');
const Registro = require('../models/registros');
const Tipo_asistencias = require("../models/tipo_asistencias");
const Reporte = require('../models/reportes');
const Licencia = require('../models/licencias');
const {licencias} = require('./usuarioController');
//admController se encarga de gestionar todo lo que puede hacer el administrador en el sistema
const encrypt = async (pass) =>{
    const hash = await bcryptjs.hash(pass, 10);
    return hash;
}
//Se crea una funcion asyncrona la cual encripta la contraseña que el administrador le asigna al usuario y retorna el hash
exports.postUsuario = async function(req, res, next){
    const {Nombre, Apellido, Genero, Correo, PASSWORD, Departamento_id} = req.body;
    const passHash = await encrypt(PASSWORD);
    const empleado = await Empleado.create({
        Nombre: Nombre,
        Apellido: Apellido,
        Genero: Genero,
        Correo: Correo,
        PASSWORD: passHash,
        Departamento_id: Departamento_id
    });
    res.redirect('/adm/crearusuario/confirmacion');
}
//Se exporta el metodo postUsuario el cual recibe los datos del usuario como su Nombre Apellido Genero etc
//luego se llama al metodo encrypt para que encripte la contraseña 
//Y finalmente usando el model Empleado junto con su metodo create se crea un registro en la base de datos con los datos
//Correspondientes del usuario una ves creado el usuario el administrador se le envia a una ventana de confirmacion
exports.crearReporte = async function(req, res){
    const {correo, motivo} = req.body;
    const empleado = await Empleado.findOne({where:{Correo:correo}});
    if(empleado){
        const reporte = await Reporte.create({
            Motivo: motivo,
            Empleado_id: empleado.id
        })
    }

}
//Se exporta el metodo crearReporte el cual recibe desde el body el correo del usuario y un motivo
//Se crea una constante llamado empleado la cual recibe el registro encontrado en la base de datos que coincide
//con el correo que ingreso el adminsitrador
//Luego se declara un if el cual dice si empleado es true es decir si se encuentra un empleado con ese correo
//Se procedera a crear un repore con el motivo que ingreso el administrador y el id del empleado al que va dirigido el reporte
exports.mostrarUsuario = async function (req, res){
    const empleados = await Empleado.findAll();
    console.log(empleados);
    res.render('eliminarUsuario', {empleados});
}
//Se exporta el metodo llamado mostrarUsuario el cual usa un metodo del model Empleado llamado findAll
//El cual recorre todos los registros finalmente se muestra la vista eliminarUsuario y se le pasa la constante empleados
//La cual contiene un array de todos los empleados que fueron encontrados
exports.deleteUsuario = async function (req, res){
    const {id} = req.body;
    const eliminarEmpleado = await Empleado.destroy({where:{id}});
}
//Se exporta el metodo llamado deleteUsuario el cual recibe el id del empleado el cual se quiere eliminar
//Luego se crea una constante llamada eliminarEmpleado la cual utiliza el model Empleado
//con su metodo destroy el cual sirve para eliminar registros
//Se eliminara el registro que coincida con el id del empleado que se quiere eliminar

exports.actualizarUsuario = async function (req, res){
    const {correo, departamento} = req.body;
    const actualizarEmpleado = await Empleado.update({Departamento_id: departamento}, {where:{Correo:correo}});
}
//Se exporta el metodo llamado actualizarUsuario el cual funciona de forma parecida al deleteUsuario
//Este recibe un correo y departamento del body 
//luego se usa el model Empleado junto con su metodo update el cual actualizara el departamento del empleado
//donde el correo del empleado coincida con el correo que ingreso el administrador

exports.atrasos = async function(req, res){
    const atrasos = await Registro.findAll({where:{Tipo_asistencia:2}, include: [{model: Empleado, attributes: ['Nombre', 'Apellido']}, {model: Tipo_asistencias, attributes: ['Tipo']}]});
    console.log(atrasos);
    res.render('atrasadas', {atrasos});
}
//Se exporta el metodo llamado atrasos el cual busca con el metodo del model Registro findAll
//Todos los registros los cuales tengan Tipo_asistencia = 2 es decir los registros de entradas atrasadas
//Junto con el nombre y el apellido del empleado
exports.anticipadas = async function(req, res){
    const anticipadas = await Registro.findAll({where:{Tipo_asistencia:3}, include: [{model:Empleado, attributes: ['Nombre', 'Apellido']}, {model: Tipo_asistencias, attributes: ['Tipo']}]});
    console.log(anticipadas);
    res.render('anticipadas', {anticipadas});
}
//Funciona parecido a atrasos solo que este busca los registros que tengan Tipo_asistencia = 3 es decir
//Salidas anticipadas junto con el nombre y apellido del empleado

exports.verInasistencias = async function(req, res){
    const inasistencias = await Registro.findAll({where:{Tipo:'inasistencia'}, include:{model:Empleado, attributes:['Nombre', 'Apellido']}});
    console.log(inasistencias);
    res.render('inasistencias', {inasistencias});
}
//Funciona muy parecido a los anteriores solo que este busca los registros los cuales tengan Tipo = 'inasistencia'
//Mostrando nuevamente el nombre y el apellido del empleado
exports.verLicencias = async function(req, res){
    res.render('verLicencias', {licencias});
}
exports.aceptarLicencias = async function(req, res){
    const empleado = await Empleado.findOne({where:{Correo:licencias[0].Correo}})
    if(empleado){
        const aceptarLicencia = await Licencia.create({
            Fecha_inicio: licencias[0].Fecha_Inicio,
            Fecha_termino: licencias[0].Fecha_Termino,
            Motivo: licencias[0].Motivo,
            Empleado_id: empleado.id
        })
    }
    
}

