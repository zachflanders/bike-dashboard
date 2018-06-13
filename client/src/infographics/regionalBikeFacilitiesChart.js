import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3'








class RegionalBikeFacilitiesChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'total',
      data: [{key:'',value:{total:0}}]
    };
    this.callApi = this.callApi.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
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
    console.log('render chart');
    console.log(sort);
    if(data){
      this.setState({data:data});
    }


        var svg = d3.select(".svg");
        svg.selectAll("*").remove();
        var  margin = {top: 20, right: 20, bottom: 80, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;
        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]);
            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if(sort == 'total'){
              var chartData = d3.nest()
                .key(function(d) { return d.loc1_faca; })
                .rollup(function(v) { return{
                  total: d3.sum(v, function(d){return d.distance;})
                } })
                .entries(this.state.data);
        }
        else if(sort == 'municipalities'){
          var chartData = d3.nest()
            .key(function(d) {console.log(d); return d.city +", "+ d.state; })
            .rollup(function(v) { return{
              total: d3.sum(v, function(d){return d.distance;})
            } })
            .entries(this.state.data)
            .sort(function(a, b){return d3.descending(a.value.total, b.value.total)});
        }
        else if(sort =='state'){
          var chartData = d3.nest()
            .key(function(d) {console.log(d); return d.state; })
            .rollup(function(v) { return{
              total: d3.sum(v, function(d){return d.distance;})
            } })
            .entries(this.state.data);
        }
        console.log(svg);








        x.domain(chartData.map(function(d) { return d.key; }));
        y.domain([0, d3.max(chartData, function(d) { return d.value.total; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

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
            .attr("x", function(d) { return x(d.key); })
            .attr("y", function(d) { return y(d.value.total); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.value.total); });


  }
  getData(){
    var stuff = this;
    this.callApi().then(function(res){
      var data = res.data[0];
        stuff.renderChart('total', data);
      return data;
    })
    .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort: </FormLabel>
        <RadioGroup
          aria-label="sort"
          name="sort"
          row={true}

          value={this.state.value}
          onChange={this.handleChange}
        >
          <FormControlLabel value="total" control={<Radio color="default"/>} label="Total" />
          <FormControlLabel value="municipalities" control={<Radio color="default" />} label="Municipalities" />
          <FormControlLabel value="state" control={<Radio color="default" />} label="State" />
        </RadioGroup>
      </FormControl>
        <svg className='svg' height="350" width='480'></svg>
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
    console.log('component did mount')
    var data = this.getData();
    this.setState({data: data});
    console.log('state: ', this.state);
  }
  componentDidUpdate(){
    console.log('component did update');
  }
}
export default RegionalBikeFacilitiesChart
