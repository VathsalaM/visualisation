var square = d3.scalePow().exponent(2)
var log = d3.scaleLog()
var threshold = d3.scaleThreshold()
var format = d3.format(".4g");
var identity = function(d){ return d;}
var logN = function(d){ return format(log(d))};
var logRound = function(d){ return threshold(log(d))};

var tableData = [
    {name:"Title",type:"th",func:identity},
    {name:"n",type:"tr",func:identity},
    {name:"n square",type:"tr",func:square},
    {name:"log(n)",type:"tr",func:logN},
    {name:"log(n) rounded",type:"tr",func:logRound}
]

var renderTable = function(){
    var data = [1,2,3,4,5,6,7,8,9,10];
    var table = d3.select('.tableContainer').append('table');

    var count = 1;
    table.selectAll('tr').data(tableData).enter().each(
        function(td){
            var type = td.type;
            var row = d3.select(this).append(type);
            row.selectAll('td').data([td.name].concat(data)).enter().append('td')
                .text(function(d,i){ return (i>0)?td.func(d):d;})
        }
    );
};

var render = function(){
    var data = [0,1,2,3,4,5,6,7,8,9,10]
    var previous = 0;
    var xScale = d3.scaleLinear().domain([0,10]).range([12,120]);
    var yScale = d3.scaleLinear().domain([0,10]).range([30,180]);
    var container = d3.select('.divContainer')
    var divs = container.selectAll('div').data(data).enter().append('div')
        .classed('blocks',true)
        .html(function(d){return d})
        .style('font',function(d){
            return "italic bold "+xScale(d)+"px/"+yScale(d)+"px Georgia, san-serif";
        })
}

renderTable();
render();
