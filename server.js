var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');

const bodyParser = require('body-parser');

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/page'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

// conexion a la base de dato
var con = mysql.createConnection({
    host: "localhost", // servidor
    user: "root", // usuario
    password: "", // password
    database: "nodeDB_v01" // base de datoss
});

con.connect(function(err) { // hacemos la conexion
    if (err) throw err; // si no hubo conexion, arrojara un error
});

app.post('/verificar', function(req, res){ // servicio POST
    var user = req.body.user + ""; // obtenemos el usuario del formulario de index.html
    var pass = req.body.password + ""; // obtenemos la contraseña del formularion de index.html

    var pagina = ""; // variable para mandar una pagina como resultado
    var errorUser = true; // variable de error de usuario
    var errorPass = true; // variable de error de contraseña
	
	con.query("SELECT * FROM usuarios", function (err, result, fields) { // hacemos la consulta al servidor
        if (err) throw err; // cachamos el error

        for(var i = 0; i < result.length; i++){ // iteramos los resultados de la consulta
            var tmpUser = result[i].user+""; // guardamos el usuario
            var tmpPass = result[i].pass+""; // guardamos la contraseña
           	 
        	// verificar el usuario del formulario con el usuario de la db    
        	if (tmpUser == user){ // si son iguales
        		errorUser = false; // variable de error se desactiva
        		if (tmpPass == pass) { // si son iguales
	        		errorPass = false; // variable de error se desactiva
	        		break; // se rompe el ciclo pues ya se encontro al usuario
	        	}
        	}
		}

	    if (errorUser == true) {
	    	pagina = "<h2>login incorrecto</h2> <p>Usuario incorrecto</p>"; // retorna un mensaje de error
	    }else if(errorPass == true){
			pagina = "<h2>login incorrecto</h2> <p>Contraseña incorrecta</p>" // retorna un mensaje de error
	    }else{
	    	// retorna un mensaje de login correcto y un enlace para acceder al examen
	    	pagina = "<h2>Login correcto</h2> <br> "
	        +" <a href='examen.html'>Entra al examen aquí<a/>";
	    }

	    res.send(pagina); // enviamos la pagina al navegador
	});
  
    
    //console.log(resultados);

    /*
    for(var i = 0; i < resultados; i++){
        console.log("usuario: "+resultados[i].user);
    }
    */
    /*
    if(user == "admin" && pass == "abc123"){
        
        pagina = "<h2>Login correcto</h2> <br> "
        +" <a href='examen.html'>Entra al examen aquí<a/>";
        res.send(pagina);

    }else{
        res.send("<h2>login incorrecto</h2>");
    }
    */
});

app.listen(8000, function () { // se inicia el servidor en el puerto 8000
    console.log('Example app listening on port 8000! ');
});