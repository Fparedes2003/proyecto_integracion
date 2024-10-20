const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./empleados');

class Reporte extends Model {}

Reporte.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    modelName: 'reportes'
})

Reporte.belongsTo(Empleado, {foreignKey: 'Empleado_id'});
Empleado.hasMany(Reporte, {foreignKey: 'Empleado_id'});

module.exports = Reporte;