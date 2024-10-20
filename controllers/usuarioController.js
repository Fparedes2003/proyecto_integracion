const Empleado = require('../models/empleados');
const Registro = require('../models/registros');
const Licencia = require('../models/licencias');
const moment = require('moment');
const { where } = require('sequelize');
//Se importan los model Empleado Registro Licencia
exports.entrada = async function (req, res) {
    const {correo} = req.body;
    const empleado = await Empleado.findOne({where:{correo}});
    if(empleado){
        const fecha = moment().format('YYYY-MM-DD');
        var hora = moment();
        var horaDeEntrada = moment().hour(9).minute(30);
        if(hora.isAfter(horaDeEntrada)){
            var tipoAs = 2;
        }else if(hora.isSame(horaDeEntrada) || hora.isBefore(horaDeEntrada)){
            var tipoAs = 1;
        }
        
        hora = moment().format('HH:mm');
        const registro = await Registro.create({
            Fecha: fecha,
            Hora: hora,
            Tipo: 'entrada',
            Empleado_id: empleado.id,
            Tipo_asistencia: tipoAs

        });
        console.log('se ha registrado tu entrada con exito');
    }
}
//El metodo entrada recibe el correo del empleado desde el body luego se hace una busqueda basandose en el correo 
//Si es que se encuentra en correo se guarda en empleado el registro encontrado
//Luego se declara un if en el cual creamos una constante llamada fecha la cual 
//Contiene la fecha actual con formato de año mes y dia. Tambien se declara una variable llamada hora
//La cual contiene el objeto moment junto con la hora actual, luego de esto se declara horaDeEntrada el cual contiene una hora 
//La cual es la hora de entrada en la empresa que serian las 9:30 AM luego de estas declaraciones se declara un if
//El cual dice que si la hora actual es despues de las 9:30 AM la variable llamada tipoAs = 2 marcandose como una entrada atrasada en cambio si es la misma hora 
//tipoAs es igual a 1 marcandose como una entrada normal. Luego de estos if la variable hora pasa a ser un dato que simplemente muestra la hora
//y los minutos. Finalmente se procede a crear el registro con los datos correspondientes 
exports.salida = async function (req, res){
    const {correo} = req.body;
    const empleado = await Empleado.findOne({where:{correo}});
    if(empleado){
        const fecha =moment().format('YYYY-MM-DD');
        var hora = moment();
        var horaDeSalida = moment().hour(17).minute(30);
        if(hora.isBefore(horaDeSalida)){
            var tipoAs = 3;
        }else if(hora.isSame(horaDeSalida) || hora.isAfter(horaDeSalida)){
            var tipoAs = 1;
        }
        hora = moment().format('HH:mm');
        const salida = await Registro.create({
            Fecha: fecha,
            Hora: hora,
            Tipo: 'salida',
            Empleado_id: empleado.id,
            Tipo_asistencia: tipoAs
        });
        console.log('Se ha registrado tu salida con exito');
    }
}
//Funciona de la misma manera que el metodo salida solo que aca se compara si es que la hora actual
//Es antes de las 17:30 pm se marca tipoAs = 3 quedando como una salida anticipada En cambio si es la misma hora
//Se marca como una salida normal

exports.inasistencia = async function (req, res){
    const {correo} = req.body;
    const empleado = await Empleado.findOne({where:{correo}});
    if(empleado){
        const fecha = moment().format('YYYY-MM-DD');
        var hora = moment().format('HH:mm');
        tipoAs = null;
        const inasistencia = await Registro.create({
            Fecha: fecha,
            Hora: hora,
            Tipo: 'inasistencia',
            Empleado_id: empleado.id,
            Tipo_asistencia: tipoAs
        });
        console.log('Se ha registrado tu inasistencia');
    }
}
//El metodo inasistencia recibe el correo del empleado desde el body
//Luego se busca en la base de datos al empleado que coincida con ese correo 
//Si es que el empleado es encontrado se declara fecha, hora y tipoAs como null
//Finalmente con los datos ya establecidos se crea el registro de inasistencia correspondiente en la base de datos

let licencias = [];
exports.licencias = licencias;
exports.licencia = async function (req, res){
    const {correo, fecha_inicio, fecha_termino, motivo} = req.body;
    const empleado = await Empleado.findOne({where:{correo}});
    if(empleado){
        licencias.push({Correo: correo,Fecha_Inicio: fecha_inicio, Fecha_Termino: fecha_termino, Motivo: motivo});
        console.log(licencias);
    } 
} 
//Licencia recibe correo, fecha_inicio, fecha_termino y motivo que ingreso el usuario desde el body
//Buscando un empleado que coincida con el correo que fue ingresado cuando el empleado es encontrado
//Se crea un registro en la tabla licencias con los datos correspondientes de la licencia y el id correspondiente del empleado