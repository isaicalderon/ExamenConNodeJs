var tituloNav 	= document.getElementById('titulo-nav');
var num2 		= document.getElementById('num1');
var titulo 		= document.getElementById('titulo-pregunta');
var img 		= document.getElementById('img');
var resultado 	= document.getElementById('resultado');
var boton 		= document.getElementById('boton1');
var aciertos  	= document.getElementById('aciertos');
var info		= document.getElementById('info');
var opciones 	= document.getElementsByName('option');
var radio_res 	= document.getElementsByName('exampleRadios'); 

var numPregunta = 0;

var preguntasMusica = [
	{
		pregunta: "El conjunto de 5 líneas y 4 espacios donde se escribe la música se llama:",
		opciones:[
			"Compás",
			"Pentagrama",
			"Clave",
			"Negra"
		],
		res: 2,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "¿Cómo se llama este símbolo musical?",
		opciones:[
			"Sostenido",
			"Corchea",
			"Becuadro",
			"Bemol"
		],
		res:1,
		imgURL: "img/img1.png",
		seleccion: -1
	},
	{
		pregunta: "¿Cómo se llama la línea curva que une a las notas ilustradas? ",
		opciones:[
			"alteración",
			"ligadura (de prolongación)",
			"alzada",
			"ligado (ligadura de expresión o articulación)"
		],
		res:2,
		imgURL: "img/img2.png",
		seleccion: -1
	},
	{
		pregunta: "¿Cómo se llaman los siguientes símbolos?  ",
		opciones:[
			"ligaduras",
			"Alzadas",
			"Barras de repetición",
			"Casillas de repetición"
		],
		res:3,
		imgURL: "img/img3.png",
		seleccion: -1
	},
	{
		pregunta: "¿Qué nota es esta? ",
		opciones:[
			"Sol",
			"Mi",
			"Do",
			"Fa"
		],
		res:3,
		imgURL: "img/img4.png",
		seleccion: -1
	}
];
//matematicas
var preguntasMate = [
	{
		pregunta: "Para cuál de estos problemas la solución sería '36 balones'",
		opciones:[
			"En un colegio había 14 balones y compran 10 balones",
			"En un colegio hay 43 balones y se pierden 7",
			"En un colegio hay 16 balones y el ayuntamiento les regala 8 balones",
			"Ninguna de las anteriores"
		],
		res: 2,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "¿Andrés tenía 12 barcos de juguete y regala 2 a su hermana. Antonio tenía 16 barcos y ha perdido 6. ¿Quién tiene más barcos?",
		opciones:[
			"Andres",
			"Antonio",
			"Ambos",
			"La hermana de Andres"
		],
		res:3,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "Al comprar una TV de $4500.00 a mi papá le cobraron el IVA del 16% ¿Cuanto pago de IVA mi papá? ",
		opciones:[
			"$270.00",
			"$5220.00",
			"$7200.00",
			"$720.00"
		],
		res:4,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "El día de mi cumpleaños repartí 21 bolsas de dulces. Si me quedan 7 bolsas, ¿Cuántas bolsas tenía? ",
		opciones:[
			"28",
			"14",
			"147",
			"3"
		],
		res:1,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "¿Cuantas partes forman 1 Entero? ",
		opciones:[
			"una",
			"dos",
			"tres",
			"cuatro"
		],
		res:4,
		imgURL: "",
		seleccion: -1
	}];
//español
var preguntasEspa = [
	{
		pregunta: "Es un signo de puntuación que separa partes de un enunciado relacionadas entre sí. Tiene mayor valor aislante que la coma, pero menor que el punto",
		opciones:[
			"Dos puntos",
			"Punto Final",
			"Punto Y coma",
			"Coma"
		],
		res: 3,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "Es un signo gráfico que representa una pausa más breve que la del punto, y se utiliza con frecuencia en toda clase de textos",
		opciones:[
			"Coma",
			"Punto",
			"Apostrofe",
			"Niguna de las anteriores"
		],
		res:1,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "Es una composición de signos codificado en un sistema de escritura (como un alfabeto) que forma una unidad de sentido ",
		opciones:[
			"Cuento",
			"Texto",
			"Fabula",
			"Chiste"
		],
		res:2,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "Es un género narrativo en verso o prosa que tiene un fin didáctico ",
		opciones:[
			"Fabula",
			"Cuento",
			"Historieta",
			"Texto"
		],
		res:1,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "a una serie de dibujos que constituye un relato, con texto o sin él, así como al libro o revista que la contiene ",
		opciones:[
			"Cuento",
			"Historieta",
			"Fabula",
			"Prosa"
		],
		res:2,
		imgURL: "",
		seleccion: -1
	}];
//Conocimentos generales
var preguntasCono = [
	{
		pregunta: "La gasolina se extrae de:",
		opciones:[
			"Granos",
			"Petroleo",
			"trementina",
			"semilla"
		],
		res: 2,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "Una tonelada tiene ___ kilos:",
		opciones:[
			"1000 kg",
			"2000 kg",
			"3000 kg",
			"4000 kg"
		],
		res:1,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "La mayoría de las exportaciones mexicanas salen por: ",
		opciones:[
			"Mazatlan",
			"Manzanillo",
			"Progreso",
			"Acapulco"
		],
		res:2,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "El nervio óptico sirve para: ",
		opciones:[
			"Ver",
			"oir",
			"probar",
			"sentir"
		],
		res:1,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "El café es una especie de: ",
		opciones:[
			"Corteza",
			"fruto",
			"hojas",
			"raiz"
		],
		res:2,
		imgURL: "",
		seleccion: -1
	}];
//Historia
var preguntasHistoria = [
	{
		pregunta: "¿Qué Presidente Mexicano que fue asesinado en Tlaxcalantongo, en el estado de Puebla?",
		opciones:[
			"Francisco I. Madero",
			"Álvaro Obregón Salido",
			"Venustiano Carranza Garza",
			"Eulalio Gutiérrez"
		],
		res: 3,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "México ha tenido dos presidentes de origen afroamericano. ¿Cuáles son?",
		opciones:[
			"Juan Álvarez y Vicente Guerrero",
			"Roque González Garza y Francisco Lagos Cházaro",
			"Adolfo López Mateos y Juan Álvarez",
			"Vicente Guerrero y Valentín Canalizo"
		],
		res:1,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "¿Qué Presidente que ganó las elecciones con el 99.26%?",
		opciones:[
			"Anastasio Bustamante",
			"Manuel Gómez Pedraza",
			"José Mariano Salas",
			"Francisco I. Madero"
		],
		res:4,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "¿Qué estatura tenía Benito Juárez? ",
		opciones:[
			"1.27 metros",
			"1.37 metros",
			"1.47 metros",
			"1.57 metros"
		],
		res:2,
		imgURL: "",
		seleccion: -1
	},
	{
		pregunta: "Presidente de México que gobernó por más de 30 años ",
		opciones:[
			"José María Iglesias",
			"Porfirio Díaz",
			"Manuel González",
			"Sebastián Lerdo de Tejada"
		],
		res:2,
		imgURL: "",
		seleccion: -1
	}
];

definirExamen(preguntasMusica, 1);

refresh();

function definirExamen(examen, data) {
	preguntas = examen
	var str = "" 
	switch(data){
		case 1:
			str = "Examen de Musica";
			break;
		case 2:
			str = "Examen de Matemáticas";
			break;
		case 3:
			str = "Examen de Español";
			break;
		case 4:
			str = "Examen de Historia";
			break;
		case 5:
			str = "Examen de Conocimientos Generales";
			break;	
	}
	tituloNav.innerText = str;
}

function refresh(){
	
	num2.innerHTML = numPregunta+1;
	titulo.innerHTML = preguntas[numPregunta].pregunta;
	img.setAttribute("src", preguntas[numPregunta].imgURL);

	for (var i = 0; i < opciones.length; i++) {
		opciones[i].innerText = preguntas[numPregunta].opciones[i];
	}

	for(var i = 0; i < radio_res.length; i++){
		radio_res[i].checked = false;
	}

	if(preguntas[numPregunta].seleccion > 0){
		radio_res[numPregunta].checked = false;
	}

	if (numPregunta == 4) {
		boton.innerHTML = "Calificar";
	}
}

function next(){
	var tmp = preguntas[numPregunta].seleccion;
	
	if (numPregunta == 4) {
		calificar();
	}else{
		if (tmp > 0) {
			numPregunta++;
			refresh();
		}
	}
}

function seleccionador(num) {
	 preguntas[numPregunta].seleccion = num;
	 //console.log(preguntas[numPregunta].seleccion);
}

function calificar() {
	var tmp = "";
	var cont = 0;
	for (var i = 0; i < 5; i++){
		//tmp += ", "+preguntas[i].seleccion;  
		console.log("sel: "+preguntas[i].seleccion+", res: "+preguntas[i].res);
		if (preguntas[i].seleccion == preguntas[i].res) {
			cont++;
		}
	}
	var res = (cont / 5) * 100;
	console.log(cont);

	resultado.innerHTML = "Tu calificacion es de: "+res+" Puntos";
	aciertos.innerHTML = "Aciertos: "+cont+" de 5";
	var infoTmp = "";
	for (var i = 0; i < 5; i++){
		infoTmp += (i+1)+". "+preguntas[i].pregunta+"<br>"
		+"Tu respuesta: "+preguntas[i].opciones[(preguntas[i].seleccion) - 1]
		+"<br> Respuesta: "+preguntas[i].opciones[(preguntas[i].res) - 1]
		+"<br><br>";
	}
	info.innerHTML = infoTmp;

}
