/**
 * Main entry point -- this file has been added to index.html in a <script> tag. Add whatever code you want below.
 */
// "use strict";

// const data = [
//     {x: 68,    y: 15, r: 10, color: "red"},
//     {x: 23,    y: 10, r: 20, color: "green"},
//     {x: 30,    y: 50, r: 30, color: "blue"}
// ];

// var dataset = [
//     {height: 72,    weight: 200, shape: 10, year: "12/20/19", month: 2},
//     {height: 68,    weight: 165, shape: 20, year: "12/20/19", month: 2},
//     {height: 69,    weight: 160, shape: 30, year: "02/20/19", month: 2},
//     {height: 68,    weight: 135, shape: 40, year: "02/20/19", month: 2},
//     {height: 64,    weight: 120, shape: 50, year: "02/20/19", month: 2},
//     {height: 72,    weight: 162, shape: 60, year: "02/20/19", month: 2},
// ];



// console.log(dataset.num_posts);
/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */
 //this ordering is not working
// window.addEventListener("load", draw_slider);


d3.csv("data/all_visualization.csv", function(dataset) {



var margin = {top:50, right:50, bottom:0, left:50},
    width = 1020 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    ;

var plot = svg.append("g")
    .attr("class", "plot")
    .attr("transform", "translate(" + 20 + "," + 0 + ")")
    ;

var Tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

var svgheight=svg.attr("height");
var svgwidth=svg.attr("width");
const translate_y = 40;
const translate_x  = 40;
// const heightCorrespondingTo0 = -0.2;
// const heightCorrespondingToWidth= 1;
const heightCorrespondingTo0 = -0.2;
const heightCorrespondingToWidth= 5;

const weightCorrespondingTo0 = 20;
const weightCorrespondingToHeight= 0;

const xForHeight = d3.scaleLinear()
    .domain([heightCorrespondingTo0-0.35, heightCorrespondingToWidth]) // TODO
    .range([0, svgwidth]); // svg.attr("width") is one way to get it

const yForWeight = d3.scaleLinear()
    .domain([weightCorrespondingTo0, weightCorrespondingToHeight-1]) // TODO
    .range([20, svgheight-45]);

var xAxis = d3.scaleLinear()
   .domain([heightCorrespondingTo0, heightCorrespondingToWidth])
   .range([0, svgwidth ]);
 plot.append("g")
   .attr("transform", "translate("+50+"," + (height) + ")")
   .style("font-size","20px").style("stroke","#000").attr('stroke-width',1)
   .call(d3.axisBottom(xAxis).tickSize(0).ticks(4).tickSizeOuter(0))
   .call(selection => selection
                          .selectAll('text')
                          .attr('dy', '20').attr('x', '40'))
   .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', "translate("+(svgwidth/2) +", "+45+")")
    .attr('font-size',"20px")
    .text('Number of Posts');

var yAxis = d3.scaleLinear()
  .domain([weightCorrespondingTo0, weightCorrespondingToHeight-1])
  .range([20,svgheight-45])
  ;
plot.append("g").style("font-size","12px").style("stroke","#000").attr('stroke-width',1)
  .attr("transform", "translate("+margin.left +", "+0+")")
  .call(d3.axisLeft(yAxis).tickSize(0).ticks(4).tickSizeOuter(0))
  .append('text')
   .attr('text-anchor', 'middle')
   .attr('transform', "translate("+(-20)+","+(svgheight/2)+"),rotate(-90)")
   .attr('font-size',"20px")
   .text('Number of Replies');


var mouseover = function(d) {
  Tooltip
    .style("opacity", 1)
};
var mousemove = function(d) {
  Tooltip
    .html(" Subreddit:"+d.subreddit+" UserName:"+d.author+ " Score:"+ d.avg_upvote + " Replies:"+d.num_replies)
    .style("left", (d3.mouse(this)[0]+1) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
  console.log(d3.mouse(this));
};
// console.log(d3.mouse(this)[0]);
var mouseleave = function(d) {
  Tooltip
    .style("opacity", 0)
};
// console.log(weightCorrespondingTo0);
// drawCircles(dataset);
// console.log(dataset);

function color_picker(subreddit){
if (subreddit=="dataisbeautiful")
{
console.log(subreddit);
color="#dd5182";
}
else if (subreddit=="dataisugly")
{
console.log(subreddit);
color="#bc5090";
}
else if (subreddit=="visualization")
{
console.log(subreddit);
color="#ffa600";
}
// else {
//   color="#" + ((1<<24)*Math.random() | 0).toString(16);
//   // console.log(Math.random());
//   // color="#" + ((1<<24)*(avg_upvote/100)| 0).toString(16);;
// }
return color
}
function drawCircles(data) {
    // d3 has been added to the html in a <script> tag so referencing it here should work.

    var locations = plot.selectAll("circle");
    // console.log(data);

    var join=locations.data(data);
    var enter = join.enter();
    var exit = join.exit();

    // console.log(parseFloat(data[0].num_posts)+Math.random());
    console.log("data");
    enter
    .append('circle')
    .attr("class", "location")
    .attr('stroke','gray')
    .attr('stroke-width',1)
    .attr("cx", function (d) { return (xForHeight(parseFloat(d.num_posts)+(Math.random()/2))); } )
    .attr("cy", function (d) { return (yForWeight(d.num_replies)+(Math.random()/2)); } )
    .attr("fill", d=>color_picker((d.subreddit)))
    .attr('fill-opacity', 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
      .transition()
      .duration(800)
    .attr("r", function (d) { if ((d.avg_upvote*100)==0) {return 7;} else {return (d.avg_upvote*15);}})
      // .attr("r", function (d) { return 10})
    ;

		exit.remove();
}


var formatDateIntoYear = d3.timeFormat("%Y");
var formatDateIntomonth = d3.timeFormat("%-m");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2020-01-01"),
  endDate = new Date("2021-04-01");


var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");

var x = d3.scaleTime()
  .domain([startDate, endDate])
  .range([0, targetValue])
  .clamp(true);

var slider_svg=d3.select("#slider_bar").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);

var slider = slider_svg.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + margin.left + "," + 30 + ")");

slider.append("line")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
          .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function() {
            currentValue = d3.event.x;
            update(x.invert(currentValue));
          })
      );

slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
      .data(x.ticks(12)) //Richa : ticks depends on number of years so change this into a variable
      .enter()
      .append("text")
      .attr("x", x)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text(function(d) { return formatDate(d); });

var handle = slider.insert("circle", ".track-overlay")
  .attr("class", "handle")
  .attr("r", 9);

var label = slider.append("text")
  .attr("class", "label")
  .attr("text-anchor", "middle")
  .text(formatDate(startDate))
  .attr("transform", "translate(0," + (-15) + ")")

var playButton = d3.select("#play-button");
playButton
  .on("click", function() {
  var button = d3.select(this);
  if (button.text() == "Pause") {
    moving = false;
    clearInterval(timer);
    // timer = 0;
    button.text("Play");
  } else {
    moving = true;
    timer = setInterval(step, 1600);
    button.text("Pause");
  }
  console.log("Slider moving: " + moving);
});
function prepare(d) {
    d.year = parseDate(d.year);
    return d;
  }
function step() {
    update(x.invert(currentValue));
    currentValue = currentValue + (targetValue/16); //Richa : Divide this by number of months ,BUG- it repeats end of year month
    if (currentValue > targetValue) {
      moving = false;
      currentValue = 0;
      clearInterval(timer);
      // timer = 0;
      playButton.text("Play");
      console.log("Slider moving: " + moving);
    }
  }
function update(h) {
  // update position and text of label according to slider scale

  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));
  // console.log(h);
  // filter data set and redraw plot
  console.log(h);
  var newData = dataset.filter(function(d) {
    // console.log(d.year,d.month,formatDateIntoYear(h),formatDateIntomonth(h));
    return (d.year == formatDateIntoYear(h) && d.month == formatDateIntomonth(h));

  });

  drawCircles(newData);
}
});
