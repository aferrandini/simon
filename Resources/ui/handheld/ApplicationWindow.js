//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var MenuView = require('ui/common/MenuView');
	var PartidaView = require('ui/common/PartidaView');
	var ResultadosView = require('ui/common/ResultadosView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'black'
	});
		
	//construct UI
	self.menuView = new MenuView();
	self.add(self.menuView);
	
	Titanium.App.addEventListener('window_hanlder', function(e) {
		if (e.item == 'nueva_partida') {
			self.secondView = new PartidaView();
			self.secondView.left = width;
			self.add(self.secondView);
			self.showSecondView();
		} else if (e.item === 'mejores_resultados') {
			self.secondView = new ResultadosView();
			self.secondView.left = width;
			self.add(self.secondView);
			self.showSecondView();
		} else if (e.item === 'volver') {
			self.showMenuView();
		} else {
			// MenuItem desconocido
		}
	});
	
	self.showSecondView = function() {
		self.menuView.animate({left: -width});
		self.secondView.animate({left: 0});
	}
	
	self.showMenuView = function() {
		self.menuView.animate({left: 0});
		
		var animation = Ti.UI.createAnimation({left: width});
		animation.addEventListener('complete', function() {
			self.remove(self.secondView);
			self.secondView = null;
		});
		self.secondView.animate(animation);
	}
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
