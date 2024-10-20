const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
//Aca se crean los modelos los cuales representan las tablas de la base de datos a la que estamos conectados

class Tipo_asistencias extends Model {}
//Se crea una clase llamada Tipo_asistencias la cual hereda de Model
Tipo_asistencias.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Tipo:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'tipo_asistencias',
    timestamps: false
    //Se llama a la instancia de sequelize se establece el nombre del modelo y se declara timettamps como false
});
//Luego se definen los campos del modelo junto con sus tipos de datos int es integer 
//En cuanto al id se establece que este es de tipo llave primaria y que es autoincremental
module.exports = Tipo_asistencias;
//Se exporta el modelo Tipo_asistencias