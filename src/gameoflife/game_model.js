
var _height, _width, _model, _id;

var listeners = [];

exports.start = function () {
  _id = requestAnimationFrame(exports.start);
  exports.step();
};

exports.stop = function () {
  cancelAnimationFrame(_id);
};

exports.randomize = function() {
	var newModel = [];
	for (var x = 0; x < _height; x++) {
		var row = [];
		for (var y = 0; y < _width; y++) {
			row.push(Math.random() > .8);
		}
		newModel.push(row);
	}
	_model = newModel;
	changed();
	return _model;	
}

exports.init = function(height, width) {
	_height = height;
	_width = width;
	_model = [];
	exports.randomize();
};

exports.getModel = function() {
	return _model;
};

exports.step = function() {
	var newModel = [];
	for (var x = 0; x < _model.length; x++) {
		var row = []
		for (var y = 0; y < _model[x].length; y++) {
			row.push(nextStep(x, y));
		}
		newModel.push(row);
	}
	_model = newModel;
	changed();
};

exports.onChange = function(listener) {
	listeners.push(listener);
};

function changed() {
	listeners.forEach(function(listener) {
		listener();
	})
};

function nextStep(x, y) {
	var numAlive = 0;
	for (var xOff = -1; xOff <= 1; xOff++) {
		for (var yOff = -1; yOff <= 1; yOff++) {
			if (xOff === 0 && yOff === 0) continue;
			var _x = x + xOff;
			if (_x < 0) continue;
			if (_x >= _height) continue;
			var _y = y + yOff;
			if (_y < 0) continue;
			if (_y >= _width) continue;
			numAlive += _model[_x][_y] ? 1 : 0;
		}
	}
	if (!_model[x][y]) return numAlive === 3;
	if (numAlive < 2) return false;
	if (numAlive < 4) return true;
	return false;
}
