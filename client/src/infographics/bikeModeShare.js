import React from 'react';
import * as d3 from 'd3';
import * as CSV from 'csvtojson';
//import BikeModeCSV from './../data/bikemode.csv';

class BikeModeShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  updateSize(){
    this.renderChart();
  }
  renderChart(){
    var chartDiv = document.getElementsByClassName("bikeModeShareSvg")[0] || 0;
    if(chartDiv != 0){
      var svg = d3.select(chartDiv),
        margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

    var parseTime = d3.timeParse("%Y");

    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.bikeshare); });

      Promise.all([
        "bikemode.csv",
      ].map(function(url) {
        return fetch(url).then(function(response) {
          return response.ok ? response.text() : Promise.reject(response.status);
        }).then(function(text) {
          return d3.csvParse(text);
        });
      })).then(function(data) {
        console.log(data);

      });

      /*


      d3.csv("bikemode.csv", type, function(error, data) {
        if (error) throw error;

        var cities = data.columns.slice(1).map(function(id) {
          return {
            id: id,
            values: data.map(function(d) {
              return {date: d.date, temperature: d[id]};
            })
          };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain([
          d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.bikeshare; }); }),
          d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.bikeshare; }); })
        ]);

        z.domain(cities.map(function(c) { return c.id; }));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Percentage of Commuters");

        var city = g.selectAll(".city")
          .data(cities)
          .enter().append("g")
            .attr("class", "city");

        city.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); });

        city.append("text")
            .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.bikeshare) + ")"; })
            .attr("x", 3)
            .attr("dy", "0.35em")
            .style("font", "10px sans-serif")
            .text(function(d) { return d.id; });

          });

          */
      function type(d, _, columns) {
        d.date = parseTime(d.date);
        for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
        return d;
      }
  }
  render(){
    return(
      <svg className='bikeModeShareSvg' height="350" width='100%'></svg>
    )
  }
  componentDidMount(){
    this.renderChart();
    window.addEventListener("resize", this.updateSize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateSize.bind(this));
  }
}
export default BikeModeShare
