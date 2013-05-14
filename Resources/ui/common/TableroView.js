function TableroView() {
	var instance = Ti.UI.createView({
		top: 0,
		left: 0,
		width: 300,
		height: 300
	});

	var ratio = 1;
	var colores = ['violeta', 'verde', 'amarillo', 'rojo', 'azul', 'naranja'];
	
	var tablero = Ti.UI.createImageView({
		image: '/tableroBlanco.png',
		top: 0,
		left: 0,
		width: 300,
		height: 300
	});
	instance.add(tablero);
	
	var botones = {
		rojo     : Ti.UI.createButton({color:3,backgroundImage: '/rojo.png',top: 204,right: 27,width: 120.5 * ratio,height: 90.5 * ratio}),
		azul     : Ti.UI.createButton({color:4,backgroundImage: '/azul.png',top: 204,left: 27,width: 120.5 * ratio,height: 90.5 * ratio}),
		naranja  : Ti.UI.createButton({color:5,backgroundImage: '/naranja.png',top: 80,left: 5.5,width: 54.5 * ratio,height: 139 * ratio}),
		violeta  : Ti.UI.createButton({color:0,backgroundImage: '/violeta.png',top: 6,left: 27,width: 120.5 * ratio,height: 90.5 * ratio}),
		verde    : Ti.UI.createButton({color:1,backgroundImage: '/verde.png',top: 6,right: 27,width: 120.5 * ratio,height: 90.5 * ratio}),
		amarillo : Ti.UI.createButton({color:2,backgroundImage: '/amarillo.png',top: 80,right: 5.5,width: 54.5 * ratio,height: 139 * ratio})
	};
	
	for (color in botones) {
		instance.add(botones[color]);
		botones[color].addEventListener('singletap', onColorClick);
	}	
	
	var jugadas = [];
	var respuesta = [];
	instance.iniciarPartida = function() {
		jugadas = [];
		respuesta = [];

		crearJugada();
		mostrarJugadas();
	}
	
	function onColorClick(e) {
		respuesta.push(e.source.color);
		for (var i=0; i<respuesta.length; i++) {
			if (jugadas[i] != respuesta[i]) {
				terminarPartidaConError();
				return;
			}
		}
		
		if (i == jugadas.length) {
			crearJugada();
			mostrarJugadas();
			
			instance.fireEvent('jugada_correcta');
		}
	}
	
	function terminarPartidaConError() {
		instance.fireEvent('partida_terminada', {puntos: instance.getPuntos()});
	}
	
	function crearJugada() {
		var jugadaNueva = Math.floor(Math.random() * (colores.length-1));
		jugadas.push(jugadaNueva);
	}
	
	function mostrarJugadas() {
		var duration = ((1000*Math.log(jugadas.length+1)) / jugadas.length);
		
		for (var i=0; i<jugadas.length; i++) {
			var color = colores[jugadas[i]];
			animateBoton(botones[color], i, duration);
		}
		
		iniciarRespuesta();
	}
	
	function animateBoton(boton, position, duration) {
		var sleep_time = 100;
		setTimeout(function() {
			boton.animate({opacity: .3, duration: duration});
			setTimeout(function() {
				boton.animate({opacity: 1, duration: duration});
			}, duration + 10);
		}, (position*(duration*2)) + sleep_time);
	}
	
	function iniciarRespuesta() {
		respuesta = [];	
	}
	
	instance.getPuntos = function() {
		return jugadas.length > 0 ? jugadas.length - 1 : 0;
	}
	
	return instance;	
}

module.exports = TableroView;