import React, { Component } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';


import blue from '@material-ui/core/colors/blue';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import ChartIcon from '@material-ui/icons/InsertChart';
import ImageIcon from '@material-ui/icons/Image';
import StoryIcon from '@material-ui/icons/LibraryBooks';
import ShareIcon from '@material-ui/icons/Share';
import DownloadIcon from '@material-ui/icons/GetApp';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



import FullscreenIcon from '@material-ui/icons/Fullscreen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ol from 'openlayers';
import 'openlayers/dist/ol.css';
import logo from './images/BWKClogo.png';
import profile from './images/profile.jpg';

import RegionalBikeFacilitiesChart from './infographics/regionalBikeFacilitiesChart.js'

const theme = createMuiTheme({
  palette: {
    primary:blue
  },
});

const styles = {
  toolbarButtons:{
    marginLeft: 'auto',
  }
};


class App extends Component {
  state = {
    response: 'hello',
    value:'total'
  };




  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar
          position='static'
          color='#ffffff'
        >
          <Toolbar>
            <img src={logo} height={40} />
            <div style={{marginLeft:'auto', display:'flex', justifyContent:'center'}}>
              <Button>
                <Typography style={{marginRight:'10px'}}>
                  Zach Flanders
                </Typography>
                <Avatar src={profile} />
              </Button>
            </div>
          </Toolbar>

        </AppBar>
        <div style={{padding:'16px'}}>
        <Grid container
          spacing={16}
          justify='center'
          align='left'
        >
          <Grid item lg={2} md={2} sm={2}>
          <Typography variant='headline' style={{textAlign:'center'}}>
            Community Dashboard
          </Typography >
          <br />
          <Divider />
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Maps" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ChartIcon />
              </ListItemIcon>
              <ListItemText primary="Charts" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Images" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <StoryIcon />
              </ListItemIcon>
              <ListItemText primary="Stories" />
            </ListItem>
          </List>
          </Grid>

          <Grid item lg={5} md={5} sm={10} align='left'>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <MapIcon />
                  </Avatar>
                }
                action={
                  <IconButton>
                    <FullscreenIcon />
                  </IconButton>
                }
                title='Regional Bike Network'
                subheader='Updated: June 6, 2018'
              />
              <div id='map'></div>
              <CardContent>
              <Typography variant='caption'>
                Source: OpenStreetMap Contributors, Municipal Data.
              </Typography>
                <Typography>
                  This regional map of Kansas City bike infrastructure is maintained by BikeWalkKC.
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton size="small"><DownloadIcon /></IconButton>
                <IconButton size="small"><ShareIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={5} md={5} sm={10} align='left'>
            <Card>

              <CardHeader

                avatar={
                  <Avatar>
                    <ChartIcon />
                  </Avatar>
                }
                action={
                  <IconButton>
                    <FullscreenIcon />
                  </IconButton>
                }
                title='Regional Bike Facilities'
                subheader='Updated: June 6, 2018'
              />
              <CardContent>
              <RegionalBikeFacilitiesChart />

              </CardContent>
              <CardActions>
                <IconButton size="small"><DownloadIcon /></IconButton>
                <IconButton size="small"><ShareIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        </div>
        <br />
      </ MuiThemeProvider>
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


export default App;
