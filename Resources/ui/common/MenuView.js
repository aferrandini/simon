//FirstView Component Constructor
function MenuView() {
	//create object instance, a parasitic subclass of Observable
	//var TableroView = require('ui/common/TableroView');
	
	var self = Ti.UI.createView({
		backgroundColor: 'black'
	});
	
	var tablero = Ti.UI.createImageView({
		image: '/tablero.png',
		top: 40,
		left: 10,
		width: 300,
		height: 300
	});
	self.add(tablero);
	
	var nuevaPartida = Ti.UI.createButton({
		backgroundImage: '/iniciarPartida.png',
		left: 20,
		bottom: 100,
		width: 280,
		height: 60
	});
	nuevaPartida.addEventListener('singletap', function(e) {
		Titanium.App.fireEvent('window_hanlder', {item:'nueva_partida'});
	});
	self.add(nuevaPartida);
	
	var mejoresResultados = Ti.UI.createButton({
		backgroundImage: '/mejoresResultados.png',
		left: 20,
		bottom: 20,
		width: 280,
		height: 60
	});
	mejoresResultados.addEventListener('singletap', function(e) {
		Titanium.App.fireEvent('window_hanlder', {item:'mejores_resultados'});
	});
	self.add(mejoresResultados);
		
	return self;
}

module.exports = MenuView;
