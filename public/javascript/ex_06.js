const DIMENSION = 100;
const SPACE = 50;
var position = DIMENSION;

var renderSquare = function(svg,newDimension,space){
    svg.append('rect')
        .style('width',DIMENSION)
        .style('height',DIMENSION)
        .style('x',newDimension+SPACE)
        .style('y',0)
        .style('rx',10)
        .style('ry',10)
        .classed('rectangle',true);
}

var renderLine = function(svg,newDimension,space){
    svg.append('line')
        .attr('x1',newDimension)
        .attr('y1',0)
        .attr('x2',newDimension)
        .attr('y2',DIMENSION)
        .classed('line',true);
}

var renderCircle = function(svg,newDimension,space){
    svg.append('circle')
        .attr('cx',newDimension-SPACE)
        .attr('cy',DIMENSION/2)
        .attr('r',DIMENSION/2);

}

var shapesData = [renderLine,renderSquare,renderCircle]

var render = function(){
    var svg = d3.select('.container').append('svg').style('width',(DIMENSION*(shapesData.length+1))+((shapesData.length+1)*SPACE));
        svg.selectAll('div').data(shapesData).enter()
        .each(function(d,i){
            d(d3.select(this),position)
            position = position+SPACE
        });
}

render();