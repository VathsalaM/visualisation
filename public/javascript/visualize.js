var randomNumberGenerator = function(n){
	var randomNumbers = [];
	for(var i=0;i<n;i++){
		randomNumbers.push({"value":Math.round(Math.random()*100),"index":i});
	}
	return randomNumbers;
}

var loadChart = function(){
	var sampleData = randomNumberGenerator(5);
	var svg = d3.select(".container")
	svg.selectAll("p").data(sampleData).enter()
		.append('p')
		.text(function(d){return d.value});
	setTimeout(function(){
		console.log("------->");
		console.log("oldData: ",JSON.stringify(sampleData));
		sampleData.shift();
		sampleData.push({"value":Math.round(Math.random()*100),"index":5})
		console.log("newData: ",JSON.stringify(sampleData));
		svg.selectAll("p").data(sampleData)
		.text(function(d){return d.value});
	},5000)
}

window.onload = loadChart;