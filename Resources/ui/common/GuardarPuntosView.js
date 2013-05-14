//FirstView Component Constructor
function GuardarPuntosView() {
	//create object instance, a parasitic subclass of Observable
	var Database = require('db/Database');
	
	var instance = Ti.UI.createView({
		width: width,
		height: height
	});
	
	instance.puntos = 0;
	
	var overlay = Ti.UI.createView({
		backgroundColor: 'black',
		opacity: .6,
		width: width,
		height: height
	});
	instance.add(overlay);
	
	var modal = Ti.UI.createView({
		backgroundColor: 'white',
		width: width-40,
		left: 20,
		height: 200,
		top: 100,
		borderRadius: 10
	});
	instance.add(modal);
	
	var titulo = Ti.UI.createLabel({
		text: 'Guarda tu puntuación',
		font: {fontSize:20,fontWeight:'bold'},
		top: 20,
		left: 20,
		textAlign: 'center'
	});
	modal.add(titulo);
	
	
	// Create a TextField.
	var fieldNombre = Ti.UI.createTextField({
		height : 35,
		top : 60,
		left : 20,
		width : modal.width - 40,
		hintText : 'Pon aquí tu nombre',
		softKeyboardOnFocus : (isAndroid ? Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS : null), // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	// Listen for return events.
	fieldNombre.addEventListener('return', function(e) {
		fieldNombre.blur();
		guardarNombre();
	});
	
	// Add to the parent view.
	modal.add(fieldNombre);
	
	var guardar = Ti.UI.createButton({
		backgroundImage: '/guardar.png',
		left: 20,
		bottom: 20,
		width: 143*0.8,
		height: 54*0.8
	});
	modal.add(guardar);
	
	var cancelar = Ti.UI.createButton({
		backgroundImage: '/cancelar.png',
		right: 20,
		bottom: 20,
		width: 143*0.8,
		height: 54*0.8
	});
	modal.add(cancelar);

	guardar.addEventListener('singletap', function() {
		guardarNombre();
	});
	
	cancelar.addEventListener('singletap', function() {
		cerrarVentana();
	});
	
	function guardarNombre() {
		var nombre = fieldNombre.value.trim();
		
		if (nombre != '' && instance.puntos > 0) {
			var sql = "INSERT INTO resultados (nombre, puntos) VALUES ('" + nombre + "', '" + instance.puntos + "')";
			var db = Database.Open(Database.DATABASE_SKELETON, Database.DATABASE_INSTALLED);
			db.execute(sql);
			db.close();
		}
		
		cerrarVentana();	
	}
	
	function cerrarVentana() {
		Titanium.App.fireEvent('window_hanlder', {item:'volver'});
	}
	
	fieldNombre.focus();
	
	return instance;
}

module.exports = GuardarPuntosView;
