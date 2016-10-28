var randomNumberGenerator = function(n){
	var randomNumbers = [];
	for(var i=0;i<n;i++){
		var data = Math.round(Math.random()*100)
		randomNumbers.push({"data":data,"key":i+""+(data/(data+i))});
	}
	return randomNumbers;
}
var sampleData = randomNumberGenerator(20);
var padding = 5;
var isPaused = false;

var loadChart = function(){

	var h = d3.scaleLinear()

	var colors = d3.scaleLinear()
			.domain([0,100])
			.range(["#BCC8E4","#0A328F"])

	var container = d3.select(".container");

	var divs = container.selectAll(".bars").data(sampleData,function(d){return d;});
		divs.enter().append('div')
		.style('width',function(d){ return (d.data*padding)+"px"})
		.style('height','30px')
		.style('background-color',function(d){ return colors(d.data)})
		.classed('bars',true)
		.style("left", 0)
		.style("top",function(d){return h((sampleData.indexOf(d)*30))+"px"})
		.text(function(d){return d.data});

	divs.exit().remove();
}

var pause = function(){
	isPaused = !isPaused;
}

setInterval(function(){
	sampleData.shift();
	var data = Math.round(Math.random()*100);
	var i = sampleData.length;
	sampleData.push({"data":data,"key":i+""+(data/(data+i))})
	loadChart();
},500)

window.onload = loadChart;