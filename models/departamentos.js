const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
class Departamento extends Model{}

Departamento.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'departamentos',
    timestamps: false
});

module.exports = Departamento;