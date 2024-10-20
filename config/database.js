const {Sequelize} = require('sequelize');
//Se importa una clase sequelize utilizando el modulo sequelize

const sequelize = new Sequelize('controlasistencias', 'root', '',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
//Aca se configura la conexion de la base de datos estableciendo el nombre de la base de datos a la que nos conectaremos
//el usuario y la contraseña
//luego se establece el host el puerto y el dialecto el cual es mysql

module.exports = sequelize;
//finalmente se exporta la conexion de la instancia sequelize
