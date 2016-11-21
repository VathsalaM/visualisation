var randomNumberGenerator = function(max){
	var randomNumbers = [];
	for(var i=0;i<max;i++){
		var data = Math.round(Math.random()*100)
		randomNumbers.push({"data":data,"key":i+""+(data/(data+i))});
	}
	return randomNumbers;
}


var loadChart = function(sampleData,colors,padding){

	var container = d3.select(".container");

	var divs = container.selectAll(".bars").data(sampleData,function(d){return d.key;});
	divs.enter().append('div')
		.style('width',function(d){ return (d.data*padding)+"px"})
		.style('height','30px')
		.style('background-color',function(d,i){ return colors(d.data)})
		.classed('bars',true)
		.style("left", 0)
		.text(function(d){return d.data});

	divs.exit().remove();
}

var render = function(padding){
    var sampleData = randomNumberGenerator(20);

    var colors = d3.scaleLinear()
            .domain([0,100])
            .range(["#BCC8E4","#0A328F"])

    loadChart(sampleData,colors,padding);
    setInterval(function(){
    	var data = Math.round(Math.random()*100);
    	var dataArray = sampleData.map(function(d){return d.data})
    	while(dataArray.indexOf(data)!=-1){
    		data = Math.round(Math.random()*100);
    	}
    	var i = sampleData.length;
    	sampleData.shift();
    	sampleData.push({"data":data,"key":i+""+(data/(data+i))})
        loadChart(sampleData,colors,padding);
    },500)
}

render(5);