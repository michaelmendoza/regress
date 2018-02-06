
var Signal = {};

Signal.linspace = function(min, max, N) {
	var step = (max - min) / (N - 1);
	var out = Array(N);
	for(var i = 0; i < N; i ++)
		out[i] = min + i * step;
	return out;
}

Signal.linearModel = function(x, b, m) {
	var N = x.length;
	var out = Array(N);
	for(var i = 0; i < N; i++)
		out[i] = x[i] * m + b;
	return out;
}

Signal.exponentialModel = function(x, A, lambda) {
	var N = x.length;
	var out = Array(N);
	for(var i = 0; i < N; i++) 
		out[i] = A * Math.exp(x[i] * lambda);
	return out;
}

Signal.biexponentialModel = function(x, b) {
	var N = x.length;
	var out = Array(N);
	for(var i = 0; i < N; i++) 
		out[i] = b[0] * Math.exp(b[1] * x[i]) + b[2] * Math.exp(b[3] * x[i]);
	return out;
}

Signal.generateData = function(type, min, max, count, beta) {

	var x = Signal.linspace(min, max, count);
	var _y = {
		'linear': function() { return Signal.linearModel(x, beta[0], beta[1]); },
		'exponential': function() { return Signal.exponentialModel(x, beta[0], beta[1]); },
		'biexponential': function() { return Signal.biexponentialModel(x, beta); }
	}
	var y = _y[type]();
	y = Signal.addRandomToArray(y, -1, 1);
	return { x:x, y:y };
} 


Signal.getRandom = function (min, max) {
	return Math.random() * (max - min) + min;
}

Signal.getRandomPointArray = function(min, max, N) {
	var array = [];
	for(var i = 0; i < N; i++) {
		array.push({x:i, y:Math.random() * (max - min) + min});
	}
	return array;
}

Signal.addRandomToArray = function(y, min, max) {
	var N = y.length;
	for(var i = 0; i < N; i++)
		y[i] += Signal.getRandom(min, max);
	return y;
}



Signal.fromPointArray = function (data) {
	var N = data.length;
	var x = Array(N);
	var y = Array(N);
	for(var i = 0; i < N; i++) {
		x[i] = data[i].x;
		y[i] = data[i].y
	}
	return { x:x, y:y }
}

Signal.toPointArray = function (x, y) {
	var N = x.length;
	var out = Array(N);
	for(var i = 0; i < N; i++) {
		out[i] = {};
		out[i].x = x[i];
		out[i].y = y[i];
	}
	return out;
} 

export default Signal;
