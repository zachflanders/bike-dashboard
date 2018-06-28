import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3'
class RegionalBikeFacilitiesChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'municipalities',
      data: [{key:'',value:{total:0}}]
    };
    this.callApi = this.callApi.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
  }
  updateSize(){
    this.renderChart('municipalities');
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.renderChart(event.target.value);
  };
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  renderChart(sort, data){
    if(data){
      this.setState({data:data});
    }
    var chartDiv = document.getElementsByClassName("svg")[0];
    var svg = d3.select(chartDiv);
    svg.selectAll("*").remove();
    var  margin = {top: 0, right: 16, bottom: 20, left: 110};
    var width = chartDiv.clientWidth - margin.left - margin.right;
    var height = chartDiv.clientHeight - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var chartData= [];
    if(sort === 'total'){
      chartData = d3.nest()
        .key(function(d) { return d.loc1_faca; })
        .rollup(function(v) { return{
          total: d3.sum(v, function(d){return d.distance;})
        }})
        .entries(this.state.data);
      var x = d3.scaleLinear().rangeRound([0, width]),
        y = d3.scaleBand().rangeRound([height, 0]).padding(0.1);
      var z = d3.scaleOrdinal().range(["#2980b9", "#27ae60", "#8e44ad"]);
      x.domain([0, d3.max(chartData, function(d) { return d.value.total; })]);
      y.domain(chartData.map(function(d) { return d.key; }));
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10));
      g.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10).tickSize(-height).tickFormat(""));
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Number");
      g.selectAll(".bar")
        .data(chartData)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", 0)
        .attr("y", function(d) { return y(d.key); }).transition()
        .attr("width", function(d) { return x(d.value.total); } )
        .attr("height", y.bandwidth())
        .attr("fill", function(d) { return z(d.key); });
    }
    else if(sort === 'municipalities'){
      chartData = d3.nest()
        .key(function(d) {return d.city +", "+ d.state; })
        .rollup(function(v) { return{
          total: d3.sum(v, function(d){return d.distance;}),
          "Conventional Bike Lane": d3.sum(v, function(d) {if(d.loc1_faca==="conventional bike lane"){return d.distance}}),
          "Trail": d3.sum(v, function(d) {if(d.loc1_faca==="trail"){return d.distance}}),
          "Shared Use Path": d3.sum(v, function(d) {if(d.loc1_faca==="shared use path"){return d.distance}})
        }})
        .entries(this.state.data)
        .sort(function(a, b){return d3.descending(a.value.total, b.value.total)}).slice(0,15);
      chartData = chartData.sort(function(a, b){return d3.ascending(a.value.total, b.value.total)});
      var keys = [];
      for(var prop in chartData[0].value){
        if(prop !== 'total'){keys.push(prop)}
      }
      var x = d3.scaleLinear().rangeRound([0, width]),
        y0 = d3.scaleBand().rangeRound([height, 0]).paddingInner(0.1),
        y1 = d3.scaleBand().padding(0.2);
      var z = d3.scaleOrdinal().range(["#2980b9", "#8e44ad", "#27ae60"]);
      x.domain([0, d3.max(chartData, function(d) {return d3.max(keys, function(key1) { return d.value[key1]; })})]).nice();
      y0.domain(chartData.map(function(d) {return d.key; }));
      y1.domain(keys).rangeRound([0, y0.bandwidth()]);;
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10));
      g.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(10).tickSize(-height).tickFormat(""));
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y0).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Number");
      g.append("g")
        .selectAll("g")
        .data(chartData)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(0," + y0(d.key) + ")"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key1) {  return {key: key1, value: d.value[key1]}; }); })
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", function(d) { return y1(d.key); })
        .attr("height", y1.bandwidth())
        .transition()
        .attr("width", function(d) {  return x(d.value); })
        .attr("fill", function(d) { return z(d.key); })
      var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + ((height-margin.bottom)-(i * 20)) + ")"; });
      legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z)
        .attr("opacity", 0.8);
      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
    }
  }
  getData(){
    var self = this;
    this.callApi().then(function(res){
      var data = res.data[0];
        self.renderChart('municipalities', data);
      return data;
    })
    .catch(err => console.log(err));
  }
  render(){
    return(
      <div style={{paddingRight:'24px', paddingLeft:'24px', height:'100%', position:'relative'}}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="sort"
          name="sort"
          row={true}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <FormControlLabel value="municipalities" control={<Radio color="default" />} label="Municipalities" />
          <FormControlLabel value="total" control={<Radio color="default"/>} label="Total" />
        </RadioGroup>
      </FormControl>
        <svg className='svg' height="350" width='100%'></svg>
        <Typography variant='caption'>
          Source: Municipal data, Google Maps.
        </Typography>
        <Typography>
          Number of miles of on-street facilities, including conventional bike lanes,
          shared use paths, and trails.
        </Typography>
      </div>
    );
  }
  componentDidMount(){
    var data = this.getData();
    this.setState({data: data});
    window.addEventListener("resize", this.updateSize.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateSize.bind(this));
  }
}
export default RegionalBikeFacilitiesChart
