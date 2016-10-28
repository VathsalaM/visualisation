var randomNumberGenerator = function(n){
	var randomNumbers = [];
	for(var i=0;i<n;i++){
		randomNumbers.push(Math.round(Math.random()*100));
	}
	return randomNumbers;
}
var sampleData = randomNumberGenerator(20);
var padding = 5;
var isPaused = false;

var colors = [d3.color("blue"),d3.color("skyblue"),d3.color("steelblue")]

console.log(d3.rgb("#F8F8FF"))

var loadChart = function(){

	var h = d3.scaleLinear()

	var c = d3.scaleLinear()
			.domain([d3.rgb("#F8F8FF"),d3.rgb("#2A52BE")])
			.range([0,1])

	var container = d3.select(".container");

	var oldDivs = container.selectAll(".bars").data(sampleData,function(d,i,s){console.log(d,i,s[i]+i);return s[i]+i});
	oldDivs.exit().remove();
	oldDivs.transition().duration(10).style("top",function(d){return h((sampleData.indexOf(d)*30))+"px"})

	var newdivs = oldDivs.enter().append('div')
		newdivs.style('width',function(d){ return (d*padding)+"px"})
		.style('height','30px')
		.style('background-color',"steelblue")
		.classed('bars',true)
		.style("left", 0)
		.style("top",function(d){return h((sampleData.indexOf(d)*30))+"px"})
		.text(function(d){return d})

	newdivs.transition()
		.duration(10)
		.style("top",function(d){return h((sampleData.indexOf(d)*30))+"px"})

}

var pause = function(){
	isPaused = !isPaused;
}

setInterval(function(){
	if(isPaused){
		return;
	}
	sampleData.shift();
	sampleData.push(Math.round(Math.random()*100))
	loadChart();
},500)




window.onload = loadChart;