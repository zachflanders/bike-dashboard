import React, { Component } from 'react';



import '../App.css';
import logo from '../images/BWKClogo.png';
import profile from '../images/profile.jpg';


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


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    console.log(this.props);
    return (
      <AppBar
        position='static'
        color='#ffffff'
      >
        <Toolbar>
          <img src={logo} height={40} />
          <Typography>
            {this.props.title}
          </Typography>
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

    );
  }
}

export default Nav;
