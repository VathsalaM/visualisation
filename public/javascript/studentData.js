var studentData = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];

var subjectColours = {"maths":"steelblue","english":"darkorange","kannada":"green","science":"red","social studies":"blueviolet","bengali":"brown","tamil":"Violet","sports":"grey"}

var visualization = function(){
	var container = d3.select('.container')
	var students = container.append('div').classed('students',true);
	container.append('br');
	var sortFields = container.append('div').text('Sort By: ').classed('sortFields',true);
	container.append('br');
	var subjects = container.append('div').classed('subjects',true);

	var studentDiv = students.selectAll('div').data(studentData);
	studentDiv.enter().append('div')
		.text(function(d){return d.name+"  "+d.score})
		.style("background-color",function(d){return subjectColours[d.subject]})
		.classed("data",true)
		.style("width",function(d){return (d.score * 3)+"px"});
	studentDiv.exit().remove();

	var sortDiv = sortFields.selectAll('button').data(generateSortList());
	sortDiv.enter().append('button')
	.text(function(d){return d.fieldName})
	.attr('onclick',function(d){ return "sortBy('"+d.fieldName+"')"});

	subjects.append('p').text('Subject: ');
	var subjectDiv = subjects.selectAll('div').data(generateSubjectsList());
	subjectDiv.enter().append('div')
	.text(function(d){return d.subject})
	.classed('subjectDivs',true)
	.style('background-color',function(d){return d.colour})
}

var sortBy = function(field){
	d3.select('.students').selectAll('div').sort(function(a,b){ 
		if(a[field] < b[field]) return -1;
    	if(a[field] > b[field]) return 1;
    	return 0;
    })
}

var generateSubjectsList = function(){
	return Object.keys(subjectColours).map(function(subject){ return {"subject":subject,"colour":subjectColours[subject]}});
}

var generateSortList = function(){
	return Object.keys(studentData[0]).map(function(fieldName){return {"fieldName":fieldName}})
}

visualization();