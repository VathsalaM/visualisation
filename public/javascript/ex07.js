var points = [
    {x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}
];

const WIDTH = 700;
const HEIGHT = 700;
const MARGIN = 30;
const DIVISOR = 10;

const INNER_WIDTH = WIDTH - 8 * MARGIN;
const INNER_HEIGHT = HEIGHT - 8 * MARGIN;

var domain = [0,1];
var xScale = d3.scaleLinear().domain(domain).range([0,INNER_WIDTH])
var yScale = d3.scaleLinear().domain(domain).range([INNER_HEIGHT,0])

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var decimal = function(number){
    return number/DIVISOR;
};

var sine = function(number){
    return decimal(Math.sin(number)+5);
};

var addCircle = function(group,cx,cy,x,y){
    group.append('circle').attr('r', 4)
       .attr('cx', function(p){return xScale(cx(p[x]))})
       .attr('cy', function(p){return yScale(cy(p[y]))})
       .classed('scale',true)
       .classed('circles',true);
};

var appendAxis = function(svg,axis,x,y){
    svg.append('g')
        .attr('transform', translate(x,y))
        .call(axis)
}

var createLine = function(curve,xFunc,yFunc,xKey,yKey){
    return d3.line()
        .curve(curve)
        .x(function(p){return xScale(xFunc(p[xKey]))})
        .y(function(p){return yScale(yFunc(p[yKey]))});
}

var appendLine = function(group,line,points,className){
    group.append('path')
        .classed('scale', true)
        .classed(className,true)
        .attr('d', line(points));
};

var createAxis = function(div,curve){
    var svg = div.append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var sampleLine = d3.line();

    var count = points.length;

    var xAxis = d3.axisBottom(xScale).ticks(count);
    var yAxis = d3.axisLeft(yScale).ticks(count);

    appendAxis(svg,xAxis,MARGIN,INNER_HEIGHT+MARGIN);
    appendAxis(svg,yAxis,MARGIN,MARGIN);

    var line = createLine(curve,decimal,decimal,'x','y');
    var sineLine = createLine(curve,decimal,sine,'x','x');

    var group = svg.append('g')
        .attr('transform',translate(MARGIN,MARGIN));

    appendLine(group,line,points,'LineScale');
    appendLine(group,sineLine,points,'SineScale');

    group.selectAll('.circlePoint').data(points)
        .enter().append('g')
        .each(function(){
            var circleGroup = d3.select(this);
            addCircle(circleGroup,decimal,decimal,'x','y');
            addCircle(circleGroup,decimal,sine,'x','x');
        });
};

var addCharts = function(){
    var x = [d3.curveLinear,d3.curveLinearClosed,d3.curveStep,d3.curveBasis,d3.curveBundle,d3.curveCardinalClosed,d3.curveCardinal,d3.curveMonotoneX];
    d3.select('.container')
        .selectAll('div')
        .data(x)
        .enter()
        .append('div')
        .style('width',500+'px')
        .style('height',500+'px')
        .classed('charts',true)
        .each(function(d){
            createAxis(d3.select(this),d);
        })
};

addCharts();