var data = [1,2,3,4,5,6,7,8,9,10];

var renderTable = function(){
    var table = d3.select('.container').append('table')
                    .style('width','500px')
                    .style('border','"1"')
                    .style('height','200px');

    var td = table.selectAll('td').data(data).enter().append('td');

    var square = d3.scalePow().exponent(2)
    var log = d3.scaleLog()
    var threshold = d3.scaleThreshold()
    var f = d3.format(".4g");
    td.append('tr').html(function(d){return d}).classed('header',true);
    td.append('tr').html(function(d){return d});
    td.append('tr').html(function(d){return square(d)});
    td.append('tr').html(function(d){return f(log(d))});
    td.append('tr').html(function(d){return threshold(log(d))});

};

renderTable();