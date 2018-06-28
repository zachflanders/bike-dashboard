import React, { Component } from 'react';
import './../App.css';
import ol from 'openlayers';
import 'openlayers/dist/ol.css';

class RegionalBikeMap extends Component {
  render() {
    return (
      <div id='map'></div>
    );
  }
  componentDidMount(){
    var layers = [
      new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://ec2-34-214-28-139.us-west-2.compute.amazonaws.com/geoserver/wms',
          params: {'LAYERS': 'Mapalize:KCBikeFacilities', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      })
    ];
    var map = new ol.Map({
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
    }
  }

export default RegionalBikeMap;
