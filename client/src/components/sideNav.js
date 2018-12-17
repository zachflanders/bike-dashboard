import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import { withRouter  } from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import HeatIcon from '@material-ui/icons/Whatshot';
import ChartIcon from '@material-ui/icons/InsertChart';
import ImageIcon from '@material-ui/icons/Image';
import CityIcon from '@material-ui/icons/Domain';
import BikeIcon from '@material-ui/icons/DirectionsBike';




class sideNav extends Component {
  render() {
    const currentPath = this.props.location.pathname;
    console.log(currentPath);
    return (
      <div className='sideNav'>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Our Reach" />
          </ListItem>
          <Link to='/bike-share' style={{textDecoration:'none'}}>
            <ListItem button>
              <ListItemIcon>
                <HeatIcon />
              </ListItemIcon>
              <ListItemText primary="Bike Share Stats" />
            </ListItem>
          </Link>
          <Link to='/bike-facilities' style={{textDecoration:'none'}}>
            <ListItem button selected>
              <ListItemIcon>
                <BikeIcon />
              </ListItemIcon>
              <ListItemText primary="Bike Facilities" />
            </ListItem>
            </Link>
          <ListItem button>
            <ListItemIcon>
              <CityIcon />
            </ListItemIcon>
            <ListItemText primary="Progress in Cities" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChartIcon />
            </ListItemIcon>
            <ListItemText primary="Other Measures" />
          </ListItem>
        </List>
      </div>
    );
  }
}
export default withRouter(sideNav);
