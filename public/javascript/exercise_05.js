var data = [0,1,2,3,4,5,6,7,8,9,10]

var render = function(){
    var previous = 0;
    var xScale = d3.scaleLinear().domain([0,10]).range([12,120]);
    var yScale = d3.scaleLinear().domain([0,10]).range([30,180]);
    var container = d3.select('.container')
    var divs = container.selectAll('div').data(data).enter().append('div')
        .classed('blocks',true)
        .html(function(d){return d})
        .style('font',function(d){
            var x = xScale(d)+"px";
            var y = yScale(d)+"px";
            return "italic bold "+x+"/"+y+" Georgia, san-serif";
        })
}

render();