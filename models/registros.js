const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./empleados');
const Tipo_asistencias = require('./tipo_asistencias');
class Registro extends Model {}

Registro.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fecha:{
        type: DataTypes.DATE
    },
    Hora:{
        type: DataTypes.TIME
    },
    Tipo:{
        type: DataTypes.STRING
    },
    Empleado_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Empleado,
            key: 'id'
        }
    },
    Tipo_asistencia:{
        type: DataTypes.INTEGER,
        references:{
            model: Tipo_asistencias,
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps: false,
    modelName: 'registros'
});

Registro.belongsTo(Tipo_asistencias, {foreignKey: 'Tipo_asistencia'});
Tipo_asistencias.hasMany(Registro, {foreignKey: 'Tipo_asistencia'});

module.exports = Registro;