const express = require('express');
//se crea una constante llamada express la cual va a utilizar el modulo o libreria que se ha instalado el cual es express
const app = express();
//se crea una instancia llamada app que es igual a express y contiene todos sus metodos
const port = 3000;
//se define el puerto del servidor express
const path = require('path')
//importamos el modulo path que nos permitira trabajar con las ubicaciones de los directorios
const bcryptjs = require('bcryptjs');
//se importa el modulo bcryptjs el cual sera utilizado para la encriptacion de contraseñas
const mysql = require('mysql2');
//se importa el modulo mysql2 
const moment = require('moment');
//se importa el modulo moment el cual sirve para realizar comparaciones con fechas u horarios
const {create} = require('express-handlebars');
//se importa la funcion create del modulo express handlebars

const hbs = create({
    extname: ".hbs", 
    partialsDir: ["views/components"],
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});
//se configura el motor de plantillas handlebars haciendo que su nombre de extension sea hbs y especificando
//en que directorio se encuentran los components 
//luego se configura el acceso de propiedades esto es importante a la hora de acceder a la base de datos por medio de una vista hbs
//se crea una constante llamada homeRoute la cual utiliza el modulo ubicado en la carpeta routes y lo mismo sucede con los demas
const admRoute = require('./routes/admRoute');
const loginRoute = require('./routes/loginRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const sequelize = require('./config/database');
//se crea una constante llamada sequelize la cual importa el modulo que se encuentra en la carpeta condfig 
//dentro de esta carpeta se encuentra la conexion de la base de datos

const Empleado = require('./models/empleados');
const Departamento = require('./models/departamentos');

app.use(express.urlencoded({extended: false}));
//middleware que nos permite acceder al body por medio de un formulario que utiliza el metodo POST 
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");
//configuracion final del motor de plantillas hbs 
app.use(express.static(path.join(__dirname, 'public')))
//aca se configura el directorio en el cual se encuentrar los archivos estaticos del proyecto el cual es el directorio public


app.use('/adm', admRoute);
app.use('/login', loginRoute);
app.use('/usuario', usuarioRoute);
//dependiendo de la ruta a la que vaya el usuario el sistema usara el modulo de rutas correspondiente 

Empleado.sync();
Departamento.sync();

app.listen(port, () =>{
    console.log('escuchando en el puerto: '+port)
})
/*se establece la conexion con el servidor express mediante un app.listen si es que la conexion es exitosa
se mostrara por la consola escuchando en el puerto 3000 
*/
