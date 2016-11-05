var number = function(n){
	return n;
}

var square = function(number){
	return number*number;
}

var log = function(number){
	return Math.log(number);
}

var roundLog = function(number){
	return Math.round(log(number));
}

var functionList = {
	"log" : log,
	"number": number,
	"roundLog": roundLog,
	"square":square
}

var generateData = function(number,functions){
	var result = [];
	for (var i = 1; i <= number; i++) {
		var data = {}
		functions.forEach(function(f){
			data[f] = functionList[f](i);
		})
		result.push(data);
	}
	return result;
}

var renderTable = function(data){
	var table = d3.select(".container").append('table').classed('numberTable',true);

	table.append('thead').append('tr')
		.selectAll('th')
		.data(data).enter()
		.append('th')
		.text(function(d){ return d.number});

	table.append('tbody')
		.selectAll('tr')
		.data(Object.keys(functionList)).enter()
		.append('tr')
		.selectAll('td')
		.data(data).enter()
		.append('td')
		.html(function(d){ return d.number})

}	

var data = generateData(10,Object.keys(functionList));

renderTable(data);
