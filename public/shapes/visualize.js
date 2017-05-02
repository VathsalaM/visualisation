const DIMENSION = 100;
const SPACE = 50;

var px = function (num) {
    return num + 'px';
};

var renderSquare = function (group, position, dimension) {
    group.append('rect')
        .style('width', dimension)
        .style('height', dimension)
        .style('x', position.x)
        .style('y', position.y)
        .style('rx', 10)
        .style('ry', 10)
        .classed('rectangle', true);
};

var renderLine = function (group, position, dimension) {
    group.append('line')
        .attr('x1', position.x + dimension)
        .attr('y1', position.y)
        .attr('x2', position.x)
        .attr('y2', position.y + dimension)
        .classed('line', true);
};

var renderCircle = function (group, position, dimension) {
    var radius = dimension / 2;
    group.append('circle')
        .attr('cx', position.x + radius)
        .attr('cy', radius + position.y)
        .attr('r', radius)
        .classed('circle', true);

};

var renderTriangle = function (group, position, dimension) {
    var point = (position.x + (dimension / 2)) + "," + position.y + " " + position.x + "," + (dimension + position.y) + " " + (position.x + dimension) + "," + (dimension + position.y);
    group.append('polygon')
        .attr('points', point)
        .classed('triangle', true);
};

var shapesData = [renderSquare, renderLine, renderCircle, renderTriangle];


var render = function () {
    var position = 5;
    var padding = 20;
    var topPosition = padding;
    var rightPosition = padding;
    var space = DIMENSION / shapesData.length;

    var svgSize = (DIMENSION * (shapesData.length + 1)) + ((shapesData.length + 1) * SPACE);

    var container = d3.select('.container');
    var width = +container.attr('width');
    var height = +container.attr('height');

    var div = container.append('div').style('width', px(div)).style('height', px(height))
        .classed('exercise', true).classed('ex2', true);

    var svg = div.append('svg')
        .style('width', width)
        .style('height', height);

    svg.selectAll('.div').data(shapesData).enter()
        .each(function (d, i) {
            if (rightPosition > (width - DIMENSION)) {
                topPosition = topPosition + dimension + padding;
                rightPosition = padding;
            }
            d(d3.select(this), {x: rightPosition, y: topPosition}, DIMENSION);
            rightPosition = rightPosition + DIMENSION + space;
        });
};

render();