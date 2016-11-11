var data = [1,2,3,4,5,6,7,8,9,10];

var renderTable = function(){
    var table = d3.select('.container').append('table')
                    .style('width','500px').style('height','200px');

    var scale = d3.scaleLinear().domain([1,10]).range([0,100])
    var td = table.selectAll('td').data(data).enter().append('td');

    var x = d3.continous
    console.log();
    console.log(Object.keys(d3.scaleLinear().range([1,10])))
//    td.append('tr').html(function(d){return scale(d)});
//    td.append('tr').html(function(d){return d});
//    td.append('tr').html(function(d){return d});
//    td.append('tr').html(function(d){return d});
//    td.append('tr').html(function(d){return d});

};

renderTable();