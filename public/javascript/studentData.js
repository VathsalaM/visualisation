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

var visualize = function(){
	var colours = d3.scaleOrdinal()
					.domain(generateSubjectsList())
					.range(d3.schemeCategory10)

	var container = d3.select('.container')
	var students = container.append('div').classed('students',true);
	container.append('br');
	var sortFields = container.append('div').text('Sort By: ').classed('sortFields',true).classed('label',true);
	container.append('br');
	var subjects = container.append('div').classed('subjects',true);

	var studentDiv = students.selectAll('div').data(studentData);
	studentDiv.enter().append('div')
		.text(function(d){return d.name+"  "+d.score})
		.style("background-color",function(d){return colours(d.subject)})
		.classed("data",true)
		.style("width",function(d){return (d.score * 3)+"px"});
	studentDiv.exit().remove();

	var sortDiv = sortFields.selectAll('button').data(generateSortList());
	sortDiv.enter().append('button')
	.text(function(d){
		var fieldName = d.fieldName;
		return fieldName[0].toUpperCase() + fieldName.slice(1,fieldName.length)
	})
	.attr('onclick',function(d){ return "sortBy('"+d.fieldName+"')"});

	subjects.append('p').text('Subjects: ').classed('subjectDivs',true).classed('label',true);
	var subjectDiv = subjects.selectAll('div').data(generateSubjectsList());
	subjectDiv.enter().append('div')
	.text(function(d){return d})
	.classed('subjectDivs',true)
	.style('background-color',function(d){return colours(d)})
}

var sortBy = function(field){
	d3.select('.students').selectAll('div').sort(function(a,b){ 
		if(a[field] < b[field]) return -1;
    	if(a[field] > b[field]) return 1;
    	return 0;
    })
}

var generateSubjectsList = function(){
	var subjects = [];
	studentData.forEach(function(d){
		if(subjects.indexOf(d.subject)==-1){
			subjects.push(d.subject);
		}
	})
	return subjects;
}

var generateSortList = function(){
	return Object.keys(studentData[0]).map(function(fieldName){return {"fieldName":fieldName}})
}

visualize();