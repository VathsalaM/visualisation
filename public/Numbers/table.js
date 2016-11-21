var data = [1,2,3,4,5,6,7,8,9,10];

var square = d3.scalePow().exponent(2)
var log = d3.scaleLog()
var threshold = d3.scaleThreshold()
var f = d3.format(".4g");

var functions = {
    "Title" : function(d){ return d},
    "n" : function(d){ return d},
    "n square" : square,
    "log(n)": function(d){return f(log(d))},
    "log(n) rounded": function(d){return threshold(log(d))}
}

var tableData = [
    {name:"Title",type:"th",func: }
]

//var createDataSet = function(){
//    return Object.keys(functions).map(function(f){
//        return {"name":f,"data":[f].concat(data.map(function(d){return functions[f](d)}))}
//    })
//}

var renderTable = function(){
    var table = d3.select('.container').append('table');

    var tr = table.selectAll('tr').data(Object.keys(functions)).enter().append('tr');
    tr.selectAll('td').data(function(d){console.log(d.data[0]);return functions[d.data[0]](d.data)}).enter()
        .append('td').html(function(d){ return d});
};

//renderTable(createDataSet());
renderTable();