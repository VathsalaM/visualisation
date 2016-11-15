var points = [
    {x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}
]

const WIDTH = 800;
const HEIGHT = 800;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 8 * MARGIN;
const INNER_HEIGHT = HEIGHT - 8 * MARGIN;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var createAxis = function(){
    var svg = d3.select('.container').append('svg')
    		.attr('width', WIDTH)
    		.attr('height', HEIGHT);

    var domain = [0,1];

    var count = points.length;
    var divisor = 10;

    var xScale = d3.scaleLinear().domain(domain).range([0,INNER_WIDTH])

    var yScale = d3.scaleLinear().domain(domain).range([INNER_HEIGHT,0])

    var xAxis = d3.axisBottom(xScale).ticks(count);
    var yAxis = d3.axisLeft(yScale).ticks(count);

    svg.append('g')
        .attr('transform', translate(MARGIN,INNER_HEIGHT+MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', translate(MARGIN,MARGIN))
        .call(yAxis)
        .classed('yAxis', true);

    var line = d3.line()
    		.x(function(p){return xScale(p.x/divisor)})
    		.y(function(p){return yScale(p.y/divisor)});

    var sineLine = d3.line()
    		.x(function(p){return xScale(p.x/divisor)})
    		.y(function(p){return yScale((Math.sin(p.x)+5)/divisor)});

    var group = svg.append('g')
        .attr('transform',translate(MARGIN,MARGIN));

    group.append('path')
        .classed('scale', true)
        .attr('d', line(points));

    group.append('path')
        .classed('scale',true)
        .attr('d',sineLine(points))

    group.selectAll('.circlePoint').data(points)
    		.enter().append('g')
    		.classed('.circlePoint',true)
    		.each(function(){
    		    var circleGroup = d3.select(this);
                circleGroup.append('circle').attr('r', 4)
                   .attr('cx', function(p){return xScale(p.x/divisor)})
                   .attr('cy', function(p){return yScale(p.y/divisor)})
                   .classed('scale',true)
                   .classed('circles',true);

               circleGroup.append('circle').attr('r',4)
                   .attr('cx', function(p){return xScale(p.x/10)})
                   .attr('cy', function(p){return yScale((Math.sin(p.x)+5)/divisor)})
                   .classed('scale',true)
                   .classed('circles',true);
            })
}

createAxis();