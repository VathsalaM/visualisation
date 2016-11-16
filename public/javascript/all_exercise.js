const WIDTH = 1000;
const HEIGHT = 700;

var px = function(num){
    return num+'px';
}

var createDivs = function(){

    var container = d3.select('.container').style('width',px(WIDTH)).style('height',px(HEIGHT));

    var padding = 20;
    var topPosition = padding;
    var rightPosition = padding;

    var data = [1,2,3,4,5,6,7];
    var dataLength = data.length;
    var divWidth = (WIDTH-padding)/3;
    var divHeight = HEIGHT/(dataLength/3);

    var divs = container.selectAll('div').data(data).enter().append('div')
        .attr('class',function(d){ return "ex"+d.index;})
        .classed('exercise',true)
        .style('width',px(divWidth))
        .style('height',px(divHeight));

    divs.each(
        function(){
            var div = d3.select(this);
            if(rightPosition>(WIDTH-padding)){
                topPosition = topPosition+divHeight;
                rightPosition = padding;
            }
            div.style('top',function(){
                return px(topPosition);
            });
            div.style('left',function(){
                return px(rightPosition);
            });
            rightPosition = rightPosition+divWidth;
        }
    );
}

createDivs();