import React, { Component } from 'react';
import './../App.css';
import ol from 'openlayers';
import 'openlayers/dist/ol.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/lab/Slider';


 var map = {};
 var myStyle = new ol.style.Style({
   stroke: new ol.style.Stroke({
     color: 'rgba(0, 0, 0, 0.5)', width: 1
   }),
   fill: new ol.style.Fill({
            color: 'rgba(0, 0, 0, 0)'
          })

 });
 var points = [];


 var coord = ol.proj.fromLonLat([-94.6, 39.1]);

 var point = new ol.geom.Point(coord);
 console.log(coord)
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
    this.state = {loaded: 'loading...', radius: 0.75, blur: 5};
    this.reloadResults = this.reloadResults.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.changeBlur = this.changeBlur.bind(this);

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

  reloadResults() {
    var self = this;
    this.setState(state => ({
      loaded: 'loading...'
    }));
    var bounds = ol.proj.transformExtent(map.getView().calculateExtent(map.getSize()),'EPSG:3857','EPSG:4326');

    axios.get('/api/bcycle', {
      params: {
        bounds: bounds
      }
    })
    .then(function(response){
      self.setState({loaded:''});
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
          <div className='item' style={{textAlign:'left'}}>
          <Button variant="contained" onClick={this.reloadResults}>
            Reload Results
          </Button>
          <br />
          <br />
          Radius: {this.state.radius}
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
          <Slider
          value={this.state.blur}
           min={0}
           max={15}
           onChange={this.changeBlur}/>
          <br />
          {this.state.loaded}
          </div>
          <div className='item'>&nbsp;
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




      axios.get('/api/bcycle', {
        params: {
          bounds: bounds
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
        self.setState({loaded:''});

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
