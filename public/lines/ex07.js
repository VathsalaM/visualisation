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

var generatePoints = function(func,start,end){
    var result = [];
    for(var i=start;i<=end;i++){
        result.push({x:i,y:func(i)});
    }
    return result;
}

var decimal = function(number){
    return number/DIVISOR;
};

var sine = function(number){
    return Math.sin(number)+5;
};

var equation = function(number){
    return (Math.sin(3*number)+1)/2;
}

var ex12Equation = function(number){
    return Math.sin(3*number)+5;
}

var identity = function(number){
    return number;
}


var generateCurveTensions = function(start,end,percent,whole){
    var raise = whole*(percent/100);
    var result = [];
    for(var i=start;i<end;i=i+raise){
        result.push(d3.curveCardinal.tension(i));
    }
    return result;
};

var addCircle = function(group,data,yFunc){
    group.append('g').selectAll('circle').data(data).enter().append('circle')
        .attr('cx',function(p){ return xScale(decimal(p.x))})
        .attr('cy',function(p){ return yScale(yFunc(p.y))})
        .classed('scale',true)
        .classed('circles',true)
        .attr('r',4);
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
    group.append('g').append('path')
        .classed('scale', true)
        .classed(className,true)
        .attr('d', line(points));
};

var createAxis = function(div){
    var svg = div.append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var sampleLine = d3.line();

    var count = points.length;

    var xAxis = d3.axisBottom(xScale).ticks(count);
    var yAxis = d3.axisLeft(yScale).ticks(count);

    appendAxis(svg,xAxis,MARGIN,INNER_HEIGHT+MARGIN);
    appendAxis(svg,yAxis,MARGIN,MARGIN);
    return svg;
};

var addLine = function(svg,curve,data,className,yFunc){
    var group = svg.append('g')
        .attr('transform',translate(MARGIN,MARGIN));

    data.forEach(function(d,i){
        var line = createLine(curve,decimal,yFunc,'x','y');
        appendLine(group,line,d,className[i]);
        addCircle(group,d,yFunc);
    });
}

var addCharts = function(data,curves,yFunc,classNames){
    d3.select('.container').append('div')
        .selectAll('div')
        .data(curves)
        .enter()
        .append('div')
        .style('width',500+'px')
        .style('height',500+'px')
        .classed('charts',true)
        .each(function(d){
            var svg = createAxis(d3.select(this));
            addLine(svg,d,data,classNames,yFunc);
        });
};

var renderCharts = function(){

    var sineData = generatePoints(sine,points[0].x,points[points.length-1].x);
    var ex09Curves = [d3.curveLinear,d3.curveLinearClosed,d3.curveStep,d3.curveBasis,d3.curveBundle,
                        d3.curveCardinalClosed,d3.curveCardinal,d3.curveMonotoneX];
    var ex09data = [points,sineData];
    var ex09ClassNames = ['LineScale','SineScale'];
    addCharts(ex09data,ex09Curves,decimal,ex09ClassNames);

    var ex10Curves = [d3.curveLinear];
    var ex10data = [generatePoints(equation,0,9)];
    var ex10ClassNames = ['RopeScale'];
    addCharts(ex10data,ex10Curves,identity,ex10ClassNames);

    var ex11Curves = generateCurveTensions(-1,1,20,2);
    addCharts(ex10data,ex11Curves,identity,ex10ClassNames);


    var ex12data = [generatePoints(function(number){return ex12Equation(number)},0,10)];
    console.log(ex12data);
    var ex12ClassNames = ['AreaScale'];
    addCharts(ex12data,ex10Curves,d3.area(ex12data),ex12ClassNames);
}

renderCharts();