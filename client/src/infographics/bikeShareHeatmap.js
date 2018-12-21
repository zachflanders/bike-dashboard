import React, { Component } from 'react';
import './../App.css';
import ol from 'openlayers';
import 'openlayers/dist/ol.css';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

 var map = {};
 var myStyle = new ol.style.Style({
   stroke: new ol.style.Stroke({
     color: 'rgba(0, 0, 0, 1)', width: 0.4
   }),
   fill: new ol.style.Fill({
            color: 'rgba(0, 0, 0, 0)'
          })

 });
 var points = [];
 var coord = ol.proj.fromLonLat([-94.6, 39.1]);
 var point = new ol.geom.Point(coord);
 var pointFeature = new ol.Feature({
  geometry: point
 });
 points.push(pointFeature);
 var vectorSource = new ol.source.Vector({
   features: points
 });
 var vectorSource2 = new ol.source.Vector({
   features: {}

 });
 var HeatmapLayer = new ol.layer.Heatmap({
   source: vectorSource,
   blur: 5,
   radius: 0.75

 });
 var extentLayer = new ol.layer.Vector({
   source: vectorSource2,
   style: myStyle
 });
class BikeShareHeatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'loading...',
      radius: 0.75,
      blur: 5,
      startDate: new Date(2015, 3, 1).toISOString().slice(0,10),
      endDate: new Date(2015, 5, 29).toISOString().slice(0,10)
    };
    this.reloadResults = this.reloadResults.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.changeBlur = this.changeBlur.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
  }

  changeRadius(event, value){
    this.setState(state => ({
      radius: value
    }));
    HeatmapLayer.setRadius(value);
  }

  changeBlur(event, value){
    this.setState(state => ({
      blur: value
    }));
    HeatmapLayer.setBlur(value);
  }

  changeStartDate(event, value){
    var newDate = event.target.value;
    this.setState(state => ({
      startDate: newDate
    }));
  }
  changeEndDate(event, value){
    var newDate = event.target.value;
    this.setState(state => ({
      endDate: newDate
    }));
  }

  reloadResults() {
    var self = this;
    this.setState(state => ({
      message: 'loading...'
    }));
    console.log(this.state);
    var bounds = ol.proj.transformExtent(map.getView().calculateExtent(map.getSize()),'EPSG:3857','EPSG:4326');
    var startDate = self.state.startDate.slice(5,7)+"/"+self.state.startDate.slice(8,10)+"/"+self.state.startDate.slice(0,4);
    var endDate = self.state.endDate.slice(5,7)+"/"+self.state.endDate.slice(8,10)+"/"+self.state.endDate.slice(0,4);

    console.log(startDate);
    axios.get('/api/bcycle', {
      params: {
        bounds: bounds,
        startDate: startDate,
        endDate: endDate,
      }
    })
    .then(function(response){
      if(response.data.data[0][0].full_count > 1000){
        self.setState({message:'Max results exceeded. Displaying 1000 of '+response.data.data[0][0].full_count+' points. (random sample)'});
      }
      else{
        self.setState({message:response.data.data[0][0].full_count+' points.'});

      }
      vectorSource.clear();
      response.data.data[0].forEach(function(item){
        var coord2 = [Number(item.longitude),Number(item.latitude)]
        var feature2 = new ol.Feature(
         new ol.geom.Point(ol.proj.fromLonLat(coord2))
        );
        vectorSource.addFeature(feature2);
      });
    });
    var extent = ol.geom.Polygon.fromExtent(map.getView().calculateExtent(map.getSize()));
    var feature3 = new ol.Feature(extent);
    vectorSource2.clear();
    vectorSource2.addFeature(feature3);

  }

  render() {
    return (
      <div>
      <div id='map'></div>
      <CardContent>
        <div className='wrapper'>
          <div className='col3' style={{textAlign:'left'}}>
          <FormControlLabel
            disabled
            control={<Checkbox checked value={false} />}
            label="Limit results to current map extent"
          />
          <br />
          <Button variant="contained" onClick={this.reloadResults}>
            Reload Results
          </Button>
          <br />
          <br />
          {this.state.message}

          </div>
          <div className='col3' style={{textAlign:'left'}}>
          <Typography variant='headline'>
          Adjust Heat
          </Typography>
          <Divider />
          <br />
          Radius: {this.state.radius}
          <br />
          <br />
          <Slider
            value={this.state.radius}
             min={0}
             max={10}
             onChange={this.changeRadius}
           />
          <br />
          <br />
          Blur: {this.state.blur}
          <br />
          <br />
          <Slider
          value={this.state.blur}
           min={0}
           max={15}
           onChange={this.changeBlur}/>
          <br />
          </div>
          <div className='col3' style={{textAlign:'left'}}>
          <Typography variant='headline'>
          Select Date Range
          </Typography>
          <Divider />
          <br />
          <form noValidate>
            <TextField
              id="datetime-local"
              label="Start Date"
              type="date"
              value = {this.state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {this.changeStartDate}
            />
          </form>
          <br />
          <br />
          <form noValidate>
            <TextField
              id="datetime-local"
              label="End Date"
              type="date"
              value={this.state.endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange = {this.changeEndDate}
            />
          </form>
          </div>
        </div>
      </CardContent>
      </div>

    );
  }

  componentDidMount(){

    var self =this;
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: myStyle
    });


    var layers = [
      new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://ec2-34-214-28-139.us-west-2.compute.amazonaws.com/geoserver/wms',
          params: {'LAYERS': 'Mapalize:OSM-KC-ROADS', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      HeatmapLayer,
      extentLayer
    ];

    map = new ol.Map({
        target: 'map',
        layers: layers,
        view: new ol.View({
          center: ol.proj.fromLonLat([-94.6, 39.1]),
          zoom: 12
        }),
        controls: [
          new ol.control.Zoom
        ]
      });

      var bounds = ol.proj.transformExtent(map.getView().calculateExtent(map.getSize()),'EPSG:3857','EPSG:4326');
      var startDate = this.state.startDate.slice(5,7)+"/"+this.state.startDate.slice(8,10)+"/"+this.state.startDate.slice(0,4);
      var endDate = this.state.endDate.slice(5,7)+"/"+this.state.endDate.slice(8,10)+"/"+this.state.endDate.slice(0,4);



      axios.get('/api/bcycle', {
        params: {
          bounds: bounds,
          startDate: startDate,
          endDate: endDate
        }
      })
      .then(function(response){
        console.log(response);
        console.log(Number(response.data.data[0][0].latitude));
/*
        var coord2 = [Number(response.data.data[0][0].longitude),Number(response.data.data[0][0].latitude)]
        console.log(coord2);

        response.data.data[0].forEach(function(item){
          var coord2 = [Number(item.longitude),Number(item.latitude)]
          var feature2 = new ol.Feature(
           new ol.geom.Point(ol.proj.fromLonLat(coord2))
          );
          map.once('postrender', function() {
            var stuff = map.getPixelFromCoordinate(feature2.getGeometry().getCoordinates());
            if(stuff[0] && stuff[1]){
              heatmap2.addData({x:stuff[0],y:stuff[1]});
            }
          });

        });
        */
        if(response.data.data[0][0].full_count > 1000){
          self.setState({message:'Max results exceeded. Displaying 1000 of '+response.data.data[0][0].full_count+' points. (random sample)'});
        }
        else{
          self.setState({message:response.data.data[0][0].full_count+' points.'});

        }

        vectorSource.clear();
        response.data.data[0].forEach(function(item){
          var coord2 = [Number(item.longitude),Number(item.latitude)]
          var feature2 = new ol.Feature(
           new ol.geom.Point(ol.proj.fromLonLat(coord2))
          );
          vectorSource.addFeature(feature2);
        });





      });
      var extent = ol.geom.Polygon.fromExtent(map.getView().calculateExtent(map.getSize()));
      var feature3 = new ol.Feature(extent);
      vectorSource2.clear();
      vectorSource2.addFeature(feature3);

    }
  }

export default BikeShareHeatmap;
