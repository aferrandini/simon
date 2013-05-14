module.exports = {
	DATABASE_SKELETON  : '/etc/resultados.db.sqlite',
	DATABASE_INSTALLED : 'main',
	
	Open : function(SKELETON, INSTALL_NAME) {
		try {
			var db = Titanium.Database.install(SKELETON, INSTALL_NAME);
		} catch(e) {
			Ti.API.debug(e);
		}
		
		if (db) {
			return db;
		} else {
			return false;
		}
	},
	
	Clean: function() {
		var db = Paradigma.Database.Open();
		db.remove();
	}
}