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

var preguntas = [
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
debugger
refresh();


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
