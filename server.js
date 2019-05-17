//var path = require('path');
var express = require('express');
var app = express();
//var router = express.Router();
var mysql = require('mysql');
const session = require('express-session')
const bodyParser = require('body-parser');

// usuario
//var nameUser;
app.set('view engine', 'ejs')
//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/page/'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(
    {'secret': '343ji43j4n3jn4jk3n'}
));
// conexion a la base de dato
var con = mysql.createConnection({
    host: "192.168.0.102", // servidor
    user: "admin", // usuario
    password: "admin", // password
    database: "nodeDB_v01" // base de datoss
});

con.connect(function(err) { // hacemos la conexion
    if (err) throw err; // si no hubo conexion, arrojara un error
});

app.get('/', function(req, res, next){
    res.sendFile(__dirname+"\\page\\index.html")
});

app.get('/home', function(req, res, next){
    //res.sendFile(__dirname+"/page/home.html", {title:"perro"})
    var tmp;
    //console.log("ID: "+req.session.name)
    con.query("SELECT * FROM usuarios WHERE ID = "+req.session.name, function (err, result, fields) { // hacemos la consulta al servidor
        if (err) throw err; // cachamos el error
        console.log(result[0])
        tmp = result[0];
        res.render('home', {
            user: tmp.user,
            musica:tmp.musica,
            mat: tmp.mat,
            esp: tmp.esp,
            his: tmp.historia,
            cg: tmp.cg,
            prom: tmp.promedio
        });
    });
});

app.get('/logout', function(req, res, next){
    //res.sendFile(__dirname+"/page/home.html", {title:"perro"})
    req.session.destroy;

    res.render('index')

});

app.post('/editar', function(req, res){
    console.log("req "+req.body.examen)
    console.log("req "+req.body.puntos)
    console.log(req.session.name)
    exm = req.body.examen;
    pts = req.body.puntos;
    var atrrib = "";
    switch(exm){
        case 1:
        case "1":
            atrrib = "musica";
            break;
        case 2:
        case "2":
            atrrib = "mat";
            break;
        case 3:
        case "3":
            atrrib = "esp";
            break;
        case 4:
        case "4":
            atrrib = "historia";
            break;
        case 5:
        case "5":
            atrrib = "cg";
            break;
                                        
    }
    console.log("atrb "+atrrib)
    var sum = 0;
    var prom = 0;
    
    con.query("SELECT * FROM usuarios WHERE ID = "+req.session.name, function (err, result, fields) { // hacemos la consulta al servidor
        if (err) throw err; // cachamos el error
        sum = result[0].musica + result[0].mat + result[0].esp + result[0].historia + result[0].cg + pts;
        console.log("sumatoria: "+sum)
        prom = sum / 5;
        console.log("promedio: "+prom)
        var sql = "UPDATE usuarios SET "+atrrib+" = "+pts+", promedio = "+prom+" WHERE ID = "+req.session.name;
        con.query(sql, function (err, result) {
        if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });

        var tmp;
        //console.log("ID: "+req.session.name)
        con.query("SELECT * FROM usuarios WHERE ID = "+req.session.name, function (err, result, fields) { // hacemos la consulta al servidor
            if (err) throw err; // cachamos el error
            console.log(result[0])
            tmp = result[0];
            res.render('home', {
                user: tmp.user,
                musica:tmp.musica,
                mat: tmp.mat,
                esp: tmp.esp,
                his: tmp.historia,
                cg: tmp.cg,
                prom: tmp.promedio
            });
        });
    });
});

app.post('/verificar', function(req, res){ // servicio POST
    var user = req.body.user + ""; // obtenemos el usuario del formulario de index.html
    var pass = req.body.password + ""; // obtenemos la contraseña del formularion de index.html
    //console.log(user)
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
                    req.session.name = result[i].ID;
                    req.session.name_user = result[i].user;
                    console.log("sesion creada ID: "+req.session.id)
                    break; // se rompe el ciclo pues ya se encontro al usuario
	        	}
        	}
		}

	    if (errorUser == true) {
	    	pagina = "<h2>login incorrecto</h2> <p>Usuario incorrecto</p>"; // retorna un mensaje de error
            res.send(pagina); // enviamos la pagina al navegador
        
        }else if(errorPass == true){
            pagina = "<h2>login incorrecto</h2> <p>Contraseña incorrecta</p>" // retorna un mensaje de error
            res.send(pagina); // enviamos la pagina al navegador
        
	    }else{
	    	// retorna un mensaje de login correcto y un enlace para acceder al examen
	    	// pagina = "<h2>Login correcto</h2> <br> "
            // +" <a href='home.html'>Entra al examen aquí<a/>";
            var tmp;
            con.query("SELECT * FROM usuarios WHERE ID = "+req.session.name, function (err, result, fields) { // hacemos la consulta al servidor
                if (err) throw err; // cachamos el error
                console.log(result[0])
                tmp = result[0];
                res.render('home', {
                    user: tmp.user,
                    musica:tmp.musica,
                    mat: tmp.mat,
                    esp: tmp.esp,
                    his: tmp.historia,
                    cg: tmp.cg,
                    prom: tmp.promedio
                });
            });
        }
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