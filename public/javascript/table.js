var data = [1,2,3,4,5,6,7,8,9,10];

var square = d3.scalePow().exponent(2)
var log = d3.scaleLog()
var threshold = d3.scaleThreshold()
var f = d3.format(".4g");

var functions = {
    "title" : function(d){ return d},
    "number" : function(d){ return d},
    "square" : square,
    "log": function(d){return f(log(d))},
    "logRound": function(d){return threshold(log(d))}

}

var createDataSet = function(){
    return Object.keys(functions).map(function(f){
        return {"name":f,"data":[f].concat(data.map(function(d){return functions[f](d)}))}
    })
}

var renderTable = function(data){
    var table = d3.select('.container').append('table')
                    .style('width','500px')
                    .style('height','200px');

    var tr = table.selectAll('tr').data(data).enter().append('tr');
    tr.selectAll('td').data(function(d){return d.data}).enter()
        .append('td').html(function(d){ return d})
        .classed('table-border',true);

};

renderTable(createDataSet);