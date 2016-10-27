const WIDTH = 1280;
const HEIGHT = 800;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var createChart = function(){
    var svg = d3.select(".container").append("svg")
        .attr('width',WIDTH)
        .attr('height',HEIGHT);
    var randomNumbers = [];
    for(var i=0;i<10;i++){
    	randomNumbers.push(Math.round(Math.random(1,100)*10));
    }
    var lineData = randomNumbers.map(function(e,i){return {"index":i,"data":e}});

    var dateRange = d3.extent(lineData, function(quote){
	    return quote['index'];
	});

	var priceRange = d3.extent(lineData, function(quote){
    	return quote['data'];
    });

	var xScale = d3.scaleTime()
	    .domain(dateRange)
	    .range([0, INNER_WIDTH]);

    var yScale = d3.scaleLinear()
	    .domain(priceRange)
	    .range([INNER_HEIGHT, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis)
		.classed('xAxis', true);

	svg.selectAll('.xAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', 0)
		.attr('y2', -INNER_HEIGHT)
		.classed('grid', true);

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('yAxis', true)
		.call(yAxis);

	svg.selectAll('.yAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', INNER_WIDTH)
		.attr('y2', 0)
		.classed('grid', true);

	var g = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

    var line = d3.line()
		.x(function(q){return xScale(q['data'])})
		.y(function(q){return yScale(q['index'])});

	g.append('path')
		.classed('random', true)
		.attr('d', line(quotes));
};

window.onload = createChart;