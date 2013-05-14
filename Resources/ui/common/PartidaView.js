//FirstView Component Constructor
function PartidaView() {
	//create object instance, a parasitic subclass of Observable
	var TableroView = require('ui/common/TableroView');
	var GuardarPuntosView = require('ui/common/GuardarPuntosView');
		
	var self = Ti.UI.createView({
		width: width
	});
	
	var tableroView = TableroView();
	tableroView.top = 40;
	tableroView.left = 10;
	tableroView.addEventListener('jugada_correcta', function(e) {
		puntos.text = tableroView.getPuntos().toString();		
	});
	tableroView.addEventListener('partida_terminada', function(e) {
		Ti.UI.createAlertDialog({
			title: 'Fin de partida',
			message: 'Has conseguido un total de ' + e.puntos + ' puntos.'
		}).show();

		if (e.puntos > 0) {
			var guardarPuntosView = GuardarPuntosView();
			guardarPuntosView.puntos = e.puntos;
			self.add(guardarPuntosView);
		} else {
			Titanium.App.fireEvent('window_hanlder', {item:'volver'});
		}
	})
	self.add(tableroView);
	
	// Create a Label.
	var labelPuntos = Ti.UI.createLabel({
		text : 'Puntos:',
		color : 'white',
		font : {fontSize:20,fontWeight:'bold'},
		height : 20,
		bottom : 100,
		left : 20
	});
	self.add(labelPuntos);
	
	// Create a Label.
	var puntos = Ti.UI.createLabel({
		text : '0',
		color : 'white',
		font : {fontSize:20},
		height : 20,
		bottom : 100,
		right : 20,
		align: 'right'
	});
	self.add(puntos);
	
	var terminarPartida = Ti.UI.createButton({
		backgroundImage: '/terminarPartida.png',
		left: 20,
		bottom: 20,
		width: 280,
		height: 60
	});
	terminarPartida.addEventListener('singletap', function(e) {
		Titanium.App.fireEvent('window_hanlder', {item:'volver'});
	});
	self.add(terminarPartida);
	
	setTimeout(function() {
		tableroView.iniciarPartida();
	}, 500);
		
	return self;
}

module.exports = PartidaView;
