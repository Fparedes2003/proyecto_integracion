const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require('../config/database');
const Departamento = require('./departamentos');
const Registro = require("./registros");
class Empleado extends Model{}

Empleado.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING
    },
    Apellido:{
        type: DataTypes.STRING
    },
    Genero:{
        type: DataTypes.STRING
    },
    Correo:{
        type: DataTypes.STRING,
        unique: true
    },
    PASSWORD:{
        type: DataTypes.STRING
    },
    Departamento_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Departamento,
            key: 'id'
        }
    }
    //Se establece que Departamento_id hace referencia al modelo Departamento y que su llave primaria es 'id'
},{
    sequelize,
    modelName: 'empleados',
    timestamps: false
});
//Aca se establece la relacion que tienen los modelos Registro con Empleado
//Diciendo que Empleado tiene muchos registros pero que un registro pertenece a un empleado
Empleado.hasMany(Registro, {foreignKey: 'Empleado_id'});
Registro.belongsTo(Empleado, {foreignKey: 'Empleado_id'});

module.exports = Empleado;