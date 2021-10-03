//Para ejecutar con nodemon, el comando es "npm run dev"
const express = require('express');
const main = express();
const path = require('path');
const mysql = require('mysql');
const connection = require('express-myconnection');
//Config
main.set('port', process.env.PORT || 3000)//Extablecemos el puerto del servidor.
main.set('view engine', 'ejs');//Utilizaremos ejs como motor de plantilla.
main.set('views', path.join(__dirname, 'vistas')); //Establecemos la ruta para nuestars views con el modulo path.

//Importamos rutas
const salaRoutes = require('./rutas/routes.js');
const { urlencoded } = require('express');

//Middleware

main.use(connection(mysql, { //Configuracion del servidor mysql
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306', //El puerto de mi localhost es el 80, si el tuyo es diferente cambia este valor por el puerto de tu mysql
    database: 'crudliondev' //Nombre de la base de datos

}, 'single'));

main.use(express.urlencoded({extended:false})); 

//Rutas
main.use('/', salaRoutes);

main.listen(main.get('port'), () => {
    console.log("Server iniciado en puerto 3000");
});