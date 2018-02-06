	
import { select, min, max, scaleLinear, line, area } from 'd3';

import Signal from './signal.js';
import Regression from './regress.js';

	var Chart = {};

	Chart.create = function() {
		var data = createExp2();
		createChart('#chart-1', data.data, data.rdata);
	}

	function createExp() {
		var d = { x: [0.005, 0.01, 0.02, 0.03, 0.04], y: [15, 21, 15, 12, 14] };
		
		var regress = new Regression();
		var beta = regress.nonLinearLeastSquares(d.x, d.y);
		var yhat = Signal.exponentialModel(d.x, beta[0], beta[1]);
		return { data:[d, { x:d.x, y:yhat }], beta:beta };	
	} 

	function createExp2() {
		var N = 50;
		var d = Signal.generateData('exponential', 0, 10, N, [20, -0.5]);
		var regress = new Regression();
		var beta = regress.nonLinearLeastSquares(d.x, d.y);
		var yhat = Signal.exponentialModel(d.x, beta[0], beta[1]);
		return { data:[d, { x:d.x, y:yhat }], beta:beta };	
	}
	
	function createChart(id, input) {

		var data = Signal.toPointArray(input[0].x, input[0].y);
		var rdata = Signal.toPointArray(input[1].x, input[1].y)
		
		var areaColor = '#C7EBFE';
		var lineColor = '#89D7F9';
		var scatterColor = '#00D5E9';

		var width = 300;
		var height = 300;

		var svg = select(id)
		    .append("svg")
		    .attr("width", width)
		    .attr("height", height)	

		// Min and Max Values
		var xmin = min(data, function (d) { return d.x; });
		var xmax = max(data, function(d) { return d.x; });
		var ymin = 0.8 * min(data, function (d) { return d.y; });
		var ymax = 1.2 * max(data, function(d) { return d.y; });

		// Get Scale
		var x = scaleLinear()
			.domain([xmin, xmax])
			.range([0, width]);
		var y = scaleLinear()
			.domain([ymin , ymax])
			.range([height, 0]);

		// Create area, and line chart objects
		var _line = line()
			.x(function(d) { return x(d.x); })
			.y(function(d) { return y(d.y); })

		var _area = area()
			.x(function(d) { return x(d.x); })
			.y0(height)
			.y1(function(d) { return y(d.y); })

		// Create Group
		var g = svg.append("g")

		// Create line chart 
		g.append("path")
			.data([rdata])
			.attr("class", "line")
			.attr("d", _line)
			.attr("stroke", lineColor)
			.attr('stroke-width', 2)
			.attr("fill", 'none')				    
			.attr("opacity", "0.8")

		// Create area chart
		g.append("path")
			.data([rdata])
			.attr("class", "area")
			.attr("d", _area)
			.attr("fill", areaColor)	
			.attr("opacity", "0.2")		    

		// Create scatter plot of data 
		g.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("r", 0.0)
			.attr("cx", function(d) { return x(d.x); })
			.attr("cy", function(d) { return y(d.y); })
			.attr("fill", function(d, i) { return scatterColor; })
			.attr("stroke", '#222222')

		g.selectAll('circle')
			.transition()
			.duration(500)				
			.attr("r", function(d, i) { return 2.0; })

	}

export default Chart;


