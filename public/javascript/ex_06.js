const DIMENSION = 100;
const SPACE = 50;
const yPosition = 5;

var renderSquare = function(group,position){
    group.append('rect')
        .style('width',DIMENSION)
        .style('height',DIMENSION)
        .style('x',position)
        .style('y',yPosition)
        .style('rx',10)
        .style('ry',10)
        .classed('rectangle',true);
}

var renderLine = function(group,position){
    group.append('line')
        .attr('x1',position+DIMENSION)
        .attr('y1',yPosition)
        .attr('x2',position)
        .attr('y2',yPosition+DIMENSION)
        .classed('line',true);
}

var renderCircle = function(group,position){
    var radius = DIMENSION/2;
    group.append('circle')
        .attr('cx',position+radius)
        .attr('cy',radius+yPosition)
        .attr('r',radius)
        .classed('circle',true);

}

var renderTriangle = function(group,position){
    var point = (position+(DIMENSION/2))+","+yPosition+" "+position+","+(DIMENSION+yPosition)+" "+(position+DIMENSION)+","+(DIMENSION+yPosition);
    group.append('polygon')
        .attr('points',point)
        .classed('triangle',true);
}

var shapesData = [renderSquare,renderLine,renderCircle,renderTriangle]


var render = function(){
    var position = 5;

    var svgSize = (DIMENSION*(shapesData.length+1))+((shapesData.length+1)*SPACE)

    var svg = d3.select('.container').append('svg')
        .style('width',svgSize)
        .style('height',svgSize);

    svg.selectAll('.div').data(shapesData).enter()
        .each(function(d,i){
            d(d3.select(this),position)
            position = position+DIMENSION+SPACE
    });
}

render();

//
//var shuffle = function(){
//    var shapesData = [renderSquare,renderLine,renderLine,renderCircle,renderTriangle]
//
//    setInterval(function(){
//        shapesData.push(shapesData.shift())
//        render(shapesData)
//    },500);
//}
//
//shuffle();