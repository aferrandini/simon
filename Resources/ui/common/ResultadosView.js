//FirstView Component Constructor
function ResultadosView() {
	//create object instance, a parasitic subclass of Observable
	var Database = require('db/Database');
		
	var instance = Ti.UI.createView({
		width: width
	});
	
	// Create an ImageView.
	var tituloResultados = Ti.UI.createImageView({
		image : '/tituloResultados.png',
		width : 320,
		height : 100,
		top : 0,
		left : 0
	});
	instance.add(tituloResultados);
	
	var tituloPosicion = Ti.UI.createLabel({
		text : '#',
		color : 'white',
		font : {fontSize:20, fontWeight:'bold'},
		height : 40,
		width : 40,
		top : 100,
		left : 10,
		textAlign : 'left',
		verticalAlign: 'center'
	});
	instance.add(tituloPosicion);
	
	var tituloNombre = Ti.UI.createLabel({
		text : 'Nombre',
		color : 'white',
		font : {fontSize:20, fontWeight:'bold'},
		height : 40,
		width : 160,
		top : 100,
		left : 60,
		textAlign : 'left',
		verticalAlign: 'center'
	});
	instance.add(tituloNombre);
	
	var tituloPuntos = Ti.UI.createLabel({
		text : 'Puntos',
		color : 'white',
		font : {fontSize:20, fontWeight:'bold'},
		height : 40,
		width : 80,
		top : 100,
		left : 230,
		textAlign : 'right',
		verticalAlign: 'center'
	});
	instance.add(tituloPuntos);
	
	var resultadosView = Ti.UI.createScrollView({
		top: 140,
		width: width,
		height: height - 260
	});
	instance.add(resultadosView);
	
	var db = Database.Open(Database.DATABASE_SKELETON, Database.DATABASE_INSTALLED);
	var rows = db.execute("SELECT * FROM resultados ORDER BY puntos DESC");
	var pos = 0;
	var rowHeight = 30; 
	while(rows.isValidRow()) {
		Ti.API.info(
			'ROW -> ' + rows.fieldByName('nombre') + ' -- ' + rows.fieldByName('puntos')
		);
		
		var rowView = Ti.UI.createView({
			height: 30,
			width: width,
			top: rowHeight * pos
		});
		
		var posicion = Ti.UI.createLabel({
			text : (pos + 1),
			color : 'white',
			font : {fontSize:16},
			height : 30,
			width : 40,
			top : 0,
			left : 10,
			textAlign : 'left',
			verticalAlign: 'center'
		});
		rowView.add(posicion);
		
		var nombre = Ti.UI.createLabel({
			text : rows.fieldByName('nombre'),
			color : 'white',
			font : {fontSize:16},
			height : 30,
			width : 160,
			top : 0,
			left : 60,
			textAlign : 'left',
			verticalAlign: 'center'
		});
		rowView.add(nombre);
		
		var puntos = Ti.UI.createLabel({
			text : rows.fieldByName('puntos'),
			color : 'white',
			font : {fontSize:16},
			height : 30,
			width : 80,
			top : 0,
			left : 230,
			textAlign : 'right',
			verticalAlign: 'center'
		});
		rowView.add(puntos);
		
		resultadosView.add(rowView);
		
		pos = pos + 1;
		
		rows.next();
	}
	rows.close();
	db.close();
	
	var volverAlMenu = Ti.UI.createButton({
		backgroundImage: '/volverAlMenu.png',
		left: 20,
		bottom: 20,
		width: 280,
		height: 60
	});
	volverAlMenu.addEventListener('singletap', function(e) {
		Titanium.App.fireEvent('window_hanlder', {item:'volver'});
	});
	instance.add(volverAlMenu);
	
	return instance;
}

module.exports = ResultadosView;
