var randomNumberGenerator = function(n){
	var randomNumbers = [];
	for(var i=0;i<n;i++){
		randomNumbers.push(Math.round(Math.random()*100));
	}
	return randomNumbers;
}

var loadChart = function(){
	var padding = 20
	var sampleData = randomNumberGenerator(5);
	var container = d3.select(".container")
	container.selectAll("div").data(sampleData).enter()
		.append('div')
		.style('width',function(d){ return (d+padding)+"px"})
		.style('height','30px')
		.style('background-color','steelblue')
		.classed('bars',true)
		.text(function(d){return d});

    // container.selectAll('div').transition()
    // 	.duration(5000)
    // 	.style('width', function(d){return (d*10)+"px"})
    // 	.text(function(d){return d});
    // 	// .style("background-color","red");

	setInterval(function(){
		sampleData.shift();
		sampleData.push(Math.round(Math.random()*100))
		container.selectAll("div").data(sampleData)
		.style('width', function(d){return (d+padding)+"px"})
		.text(function(d){return d});
	},1000)
}

window.onload = loadChart;