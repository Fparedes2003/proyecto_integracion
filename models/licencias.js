const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./empleados');

class Licencia extends Model {}

Licencia.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fecha_inicio:{
        type: DataTypes.DATE
    },
    Fecha_termino:{
        type: DataTypes.DATE
    },
    Motivo:{
        type: DataTypes.STRING
    },
    Empleado_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Empleado,
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps: false,
    modelName: 'licencias'
})

module.exports = Licencia;