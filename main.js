
import Chart from './chart.js';
import Signal from './signal.js';
import Regression from './regress.js';

var N = 50;
var d = Signal.generateData('exponential', 0, 10, N, [20, -0.5]);
//var d = { x: [0.005, 0.01, 0.02, 0.03, 0.04], y: [15, 21, 15, 12, 14] };

var regress = new Regression();
var beta = regress.nonLinearLeastSquares(d.x, d.y);
var yhat = Signal.exponentialModel(d.x, beta[0], beta[1]);
var data = [d, { x:d.x, y:yhat }];

Chart.createChart('#chart-1', data);
