var generate_randomData = function(){
	var randomNumbers = [];
	for(var i=0;i<50;i++){
	    	randomNumbers.push(Math.round(Math.random(1,100)*10));
	}
	return randomNumbers.map(function(e,i){return {"index":i,"data":e}});	
}

var addNewData = function(oldData){
	oldData.shift();
	oldData.push({"index":oldData.length,"data":Math.round(Math.random(1,100)*10)});
	return oldData.map(function(e,i){e['index']=i; return e;})
}



var drawChart = function(){
	renderChart("lineChart");
	renderChart("barChart");
}

const WIDTH = 700;
const HEIGHT = 500;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var xScale,yScale,_xAxis,_yAxis;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};



var createChart = function(classType){
	var svg = d3.select('.container').select("."+classType).append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	xScale = d3.scaleLinear()
	    .domain([0,100])
	    .range([0, INNER_WIDTH]);

	yScale = d3.scaleLinear()
	    .domain([0,100])
	    .range([INNER_HEIGHT, 0]);

	_xAxis = d3.axisBottom(xScale).ticks(10);
	_yAxis = d3.axisLeft(yScale).ticks(10);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(_xAxis)
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
		.call(_yAxis);

	svg.selectAll('.yAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', INNER_WIDTH)
		.attr('y2', 0)
		.classed('grid', true);
}

var loadLineChart = function(data){

	var dataRange = d3.extent(data, function(quote){
	    return quote['data'];
	});

	var indexRange = d3.extent(data, function(quote){
	    return quote['index'];
	});

	var svg = d3.select('.lineChart').select('svg');
	svg.selectAll('.random').remove();
	var g = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN))
		.classed('random',true);

	xScale.domain(indexRange);
	yScale.domain(dataRange);

	var line = d3.line()
		.x(function(q){return xScale(q['index'])})
		.y(function(q){return yScale(q['data'])});

	g.append('path')
		.classed('close-price', true)
		.attr('d', line(data));

	g.selectAll('path').exit().remove();
};

var loadBarChart = function(data){

	var dataRange = d3.extent(data, function(quote){
	    return quote['data'];
	});

	var indexRange = d3.extent(data, function(quote){
	    return quote['index'];
	});

	var svg = d3.select('.barChart').select('svg');
	svg.selectAll('.random').remove();
	var g = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN))
		.classed('random',true);

	xScale.domain(indexRange);
	yScale.domain(dataRange);

	g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("transform","rotate(0)")
      .attr("x", function(d) { return xScale(d['index']) })
      .attr("y", function(d) { return yScale(d['data']) })
      .attr("width", 10)
      .attr("height", function(d) { console.log(INNER_HEIGHT - yScale(d.data));return INNER_HEIGHT - yScale(d.data); });
	g.selectAll('.bar').exit().remove();
};

var charts = {"lineChart":loadLineChart,"barChart":loadBarChart};

var data = generate_randomData();
var renderChart = function(chartType){
	createChart(chartType);
	charts[chartType](data);
	setInterval(function(){
		data = addNewData(data);
		charts[chartType](data);
	},500)
}

window.onload = drawChart;
