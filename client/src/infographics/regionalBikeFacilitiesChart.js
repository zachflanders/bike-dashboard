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
      value:'municipalities',
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
    function make_x_gridlines() {
    return d3.axisBottom(x)
        .ticks(5)
      }


        var svg = d3.select(".svg");
        svg.selectAll("*").remove();
        var  margin = {top: 0, right: 16, bottom: 20, left: 110},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;
        var x = d3.scaleLinear().rangeRound([0, width]),
          y = d3.scaleBand().rangeRound([height, 0]).padding(0.1);
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
            .key(function(d) {return d.city +", "+ d.state; })
            .rollup(function(v) { return{
              total: d3.sum(v, function(d){return d.distance;}),
              bikelane: d3.sum(v, function(d) {if(d.loc1_faca=="conventional bike lane"){return d.loc1_faca}}),
              trail: d3.sum(v, function(d) {if(d.loc1_faca=="trail"){return d.loc1_faca}}),
              shared: d3.sum(v, function(d) {if(d.loc1_faca=="shared"){return d.loc1_faca}})
            } })
            .entries(this.state.data)
            .sort(function(a, b){return d3.descending(a.value.total, b.value.total)}).slice(0,20);

            chartData = chartData.sort(function(a, b){return d3.ascending(a.value.total, b.value.total)})


        }
        else if(sort =='state'){
          var chartData = d3.nest()
            .key(function(d) {console.log(d); return d.state; })
            .rollup(function(v) { return{
              total: d3.sum(v, function(d){return d.distance;})
            } })
            .entries(this.state.data);
            margin = {top: 0, right: 16, bottom: 20, left: 35},
              width = +svg.attr("width") - margin.left - margin.right,
              height = +svg.attr("height") - margin.top - margin.bottom;
             x = d3.scaleLinear().rangeRound([0, width]),
              y = d3.scaleBand().rangeRound([height, 0]).padding(0.1);
                 g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }
        console.log(svg);








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
            .attr("y", function(d) { return y(d.key); })
            .attr("width", function(d) { return x(d.value.total); } )
            .attr("height", y.bandwidth());


  }
  getData(){
    var stuff = this;
    this.callApi().then(function(res){
      var data = res.data[0];
        stuff.renderChart('municipalities', data);
      return data;
    })
    .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
      <FormControl component="fieldset">
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
