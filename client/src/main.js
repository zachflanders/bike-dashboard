import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter  } from 'react-router-dom'
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

import RegionalBikeFacilitiesChart from './infographics/regionalBikeFacilitiesChart.js';
import Dashboard from './dashboard.js';
import RegionalBikeMap from './infographics/regionalBikeMap.js';

import Nav from './components/nav.js'


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





class Main extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props.location.pathname);
    this.state = {title: this.props.location.pathname};
  }

  dashboard = ({ match }) => {
    return <Dashboard handleClick={this.handleClick} />
  }


  handleClick(){
    console.log('hello.');
    this.setState({title:'title2'});
    console.log(this.props);
  }




  render() {
    var title = '';
    var home = true;
    if(this.props.location.pathname=='/regional-bike-map'){
      title = "Regional Bike Facilities Map"
      home = false;
    }
    return (
      <main>
        <Nav title={title} home={home} />
        <Switch>
          <Route exact path='/' component={this.dashboard}/>
          <Route path='/regional-bike-map' component={RegionalBikeMap}/>
        </Switch>
      </main>


    );
  }

  }


export default withRouter(Main);
