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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


 var map = {};

 var points = [];
 var coord = ol.proj.fromLonLat([-94.6, 39.1]);
 var point = new ol.geom.Point(coord);
 var pointFeature = new ol.Feature({
  geometry: point
 });
 points.push(pointFeature);
 var vectorSource = new ol.source.Vector({
   features: points,
   renderMode: 'image',

 });
 var HeatmapLayer = new ol.layer.Heatmap({
   source: vectorSource,
   blur: 5,
   radius: 0.75,

 });

class BikeShareHeatmap extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      totalItems: 1,
      extentItems:1,
      message: 'loading...',
      radius: 0.75,
      blur: 5,
      startDate: new Date(2012, 1, 1).toISOString().slice(0,10),
      endDate: new Date(2015, 5, 29).toISOString().slice(0,10)
    };
    this.reloadResults = this.reloadResults.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.changeHeat = this.changeHeat.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
  }

  changeRadius(){
    var self = this;
    console.log(self.state.extentItems, self.state.totalItems);
    var ratio = map.getView().getResolutionForZoom(12)/map.getView().getResolution();
    var zoom = map.getView().getZoom();
    console.log("ratio: ", ratio, "zoom: ", map.getView().getZoom());
    var radiusValue = 0;
    var blurValue = 0;
    switch(true){
      case (zoom < 10 && zoom >= 9):
        radiusValue = 0.2;
        blurValue = 0.8;
        break;
      case (zoom < 11 && zoom >= 10):
        radiusValue = 0.2;
        blurValue = 0.8;
        break;
      case (zoom < 12 && zoom >= 11):
        radiusValue = 0.3;
        blurValue = 1;
        break;
      case (zoom < 12.5 && zoom >= 12):
        radiusValue = 0.5;
        blurValue = 1.3;
        break;
      case (zoom < 13 && zoom >= 12.5):
        radiusValue = 0.75;
        blurValue = 1.6;
        break;

      case (zoom <14 && zoom >=13):
        radiusValue = 1;
        blurValue = 3;
        break;
      case (zoom <15 && zoom >=14):
        radiusValue = 1.25;
        blurValue = 4.5;
        break;
      case (zoom <16 && zoom >=15):
        radiusValue = 1.5;
        blurValue = 6;
        break;
      case (zoom <17 && zoom >=16):
        radiusValue = 1.8;
        blurValue = 10;
        break;
      case (zoom <18 && zoom >=17):
        radiusValue = 3;
        blurValue = 12;
        break;
      case (zoom <19 && zoom >=18):
        radiusValue = 4.5;
        blurValue = 16;
        break;
      case (zoom <20 && zoom >=19):
          radiusValue = 6;
          blurValue = 20;
          break;
      case (zoom <21 && zoom >=20):
          radiusValue = 10;
          blurValue = 24;
          break;
      default:
        radiusValue = (ratio)/2;
        blurValue = (ratio)*2;
    }
    this.setState(state => ({
      radius: radiusValue,
      blur: blurValue
    }));
    HeatmapLayer.setRadius(radiusValue);
    HeatmapLayer.setBlur(blurValue);
  }

  changeHeat(event, value){
    this.setState(state => ({
      radius: value,
      blur: value*4
    }));
    HeatmapLayer.setRadius(value);
    HeatmapLayer.setBlur(value*4);
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
      self.setState({message:'Loading...'});
    console.log(this.state);
    var bounds = ol.proj.transformExtent(map.getView().calculateExtent(map.getSize()),'EPSG:3857','EPSG:4326');
    var startDate = self.state.startDate.slice(5,7)+"/"+self.state.startDate.slice(8,10)+"/"+self.state.startDate.slice(0,4);
    var endDate = self.state.endDate.slice(5,7)+"/"+self.state.endDate.slice(8,10)+"/"+self.state.endDate.slice(0,4);
    axios.get('/api/bcycle', {
      params: {
        bounds: bounds,
        startDate: startDate,
        endDate: endDate,
      }
    })
    .then(function(response){
      var lastItem = response.data.data[0].length-1;
      self.setState(state => ({
        totalItems: response.data.data[0][lastItem].full_count,
        extentItems: response.data.data[0][0].full_count
      }));
      if(response.data.data[0][0].full_count > 10000){
        self.setState({message:'Max results exceeded. Displaying 10000 of '+self.state.extentItems+' points. (random sample)'});
      }
      else{
        self.setState({message:self.state.totalItems+' points.'});

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

  }

  render() {
    return (
      <div>
      <div id='bikeshareheatmap'>

      </div>
      <CardContent>
        <div>
          {this.state.message}
        </div>
        <div className='wrapper'>
          <div className='col3' style={{textAlign:'left'}}>
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
          </div>
          <div className='col3' style={{textAlign:'left'}}>
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
          <div className='col3' style={{textAlign:'left'}}>
            <Button
              variant = 'contained'
              onClick={this.reloadResults}
            >
              Reload Results
            </Button>
          </div>
        </div>
      </CardContent>
      </div>
    );
  }
  componentDidMount(){
    var self =this;
    var layers = [
      new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://ec2-34-214-28-139.us-west-2.compute.amazonaws.com/geoserver/wms',
          params: {'LAYERS': 'Mapalize:OSM-KC-ROADS', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      HeatmapLayer
    ];
    map = new ol.Map({
        target: 'bikeshareheatmap',
        layers: layers,
        view: new ol.View({
          center: ol.proj.fromLonLat([-94.6, 39.1]),
          zoom: 12,
          minZoom:9,
          maxZoom: 20
        }),
        controls: [
          new ol.control.Zoom()
        ]
      });
      map.on('moveend', function(){
        console.log(map.getView().getResolutionForZoom(12), map.getView().getResolution());
        self.reloadResults();
        self.changeRadius();
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
        var lastItem = response.data.data[0].length-1;
        self.setState(state => ({
          totalItems: response.data.data[0][lastItem].full_count,
          extentItems: response.data.data[0][0].full_count
        }));
        if(response.data.data[0][0].full_count > 10000){
          self.setState({message:'Max results exceeded. Displaying 10000 of '+self.state.extentItems+' points. (random sample)'});
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
    }
  }



export default BikeShareHeatmap;
