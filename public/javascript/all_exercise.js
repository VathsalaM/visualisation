var renderBarChart = function(){

};

var renderBarChartWithColor = function(){

};

var sortBy = function(field,studentData){
	d3.select('.students').selectAll('div').sort(function(a,b){
		if(a[field] < b[field]) return -1;
    	if(a[field] > b[field]) return 1;
    	return 0;
    }).transition().duration(750)
    .ease(d3.easeLinear)
    .style("top",function(d,i){return (i*18)+"px"})
}

var generateSubjectsList = function(studentData){
	var subjects = [];
	studentData.forEach(function(d){
		if(subjects.indexOf(d.subject)==-1){
			subjects.push(d.subject);
		}
	})
	return subjects;
}

var generateSortList = function(studentData){
	return Object.keys(studentData[0]).map(function(fieldName){return {"fieldName":fieldName}})
}

var renderStudentData = function(div,studentData){

    var colours = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(generateSubjectsList(studentData));

    var students = div.append('div').style('width',).classed('students',true);
    var studentDiv = students.selectAll('div').data(studentData);
    studentDiv.enter().append('div')
        .text(function(d){ return d.name+"  "+d.score})
        .style("background-color",function(d){return colours(d.subject)})
        .classed("data",true)
        .style("width",function(d){ return (d.score*3)+"px"})
        .style("top",function(d,i){ return (i*18)+"px"});

    studentDiv.exit().remove();

    var sortFields = div.append('div').text('Sort By: ').classed('sortFields',true);
    var sortDiv = sortFields.selectAll('button').data(generateSortList(studentData));
    sortDiv.enter().append('button')
        .text(function(d){
            var fieldName = d.fieldName;
            return fieldName[0].toUpperCase() + fieldName.slice(1,fieldName.length)
        })
    .attr('onclick',function(d){ return "sortBy('"+d.fieldName+"')"});

    var subjects = div.append('div').text('Subjects: ').classed('subjects',true);
    var subjectDiv = subjects.selectAll('div').data(generateSubjectsList(studentData));
    subjectDiv.enter().append('div')
        .text(function(d){ return d})
        .classed('subjectDivs',true)
        .style('background-color',function(d){ return colours(d)})
        .style("width",function(d){ return (d.length*8)+"px"});
};

var renderTable = function(){

};

var renderNumbers = function(){

};

var renderShapes = function(){

};

var renderLines = function(){

};

var renderLinesWithCircle = function(){

};

var chartData = [];
var studentsData = [
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
var tableData = [];
var numberData = [];
var shapesData = [];
var pointsData = [];

var dataToVisualize = [
    {name:"moving horizontal bar chart",index:1,render:renderBarChart,data:chartData},
    {name:"ex 01 with shades of blue",index:2,render:renderBarChartWithColor,data:chartData},
    {name:"student record",index:3,render:renderStudentData,data:studentsData},
    {name:"math table",index:4,render:renderTable,data:tableData},
    {name:"numbers",index:5,render:renderNumbers,data:numberData},
    {name:"shapes",index:6,render:renderShapes,data:shapesData},
    {name:"lines with axis and sine value",index:7,render:renderLines,data:pointsData},
    {name:"circles on points of ex 07",index:7,render:renderLinesWithCircle,data:pointsData}
]

const WIDTH = 1000;
const HEIGHT = 700;

var px = function(num){
    return num+'px';
}

var createDivs = function(){

    var container = d3.select('.container').style('width',px(WIDTH)).style('height',px(HEIGHT));

    var padding = 20;
    var topPosition = padding;
    var rightPosition = padding;

    var dataLength = dataToVisualize.length;
    var divWidth = (WIDTH-padding)/3;
    var divHeight = HEIGHT/(dataLength/3);

    var divs = container.selectAll('div').data(dataToVisualize).enter().append('div')
        .attr('class',function(d){ return "ex"+d.index;})
        .classed('exercise',true)
        .style('width',px(divWidth))
        .style('height',px(divHeight));

    divs.each(
        function(){
            var div = d3.select(this);
            if(rightPosition>(WIDTH-padding)){
                topPosition = topPosition+divHeight;
                rightPosition = padding;
            }
            div.style('top',function(){
                return px(topPosition);
            });
            div.style('left',function(){
                return px(rightPosition);
            });
            rightPosition = rightPosition+divWidth;
        }
    );
}

var addVisualisations = function(){
    d3.selectAll('.exercise').each(
        function(d){
            d.render(d3.select(this),d.data);
        }
    )
}

createDivs();
addVisualisations();