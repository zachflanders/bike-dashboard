import React, { Component } from 'react';
import '../App.css';
import logo from '../images/BWKClogo.png';
import profile from '../images/profile.jpg';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AppBar
        position='static'
        color='inherit'
      >
        <Toolbar>
          {this.props.home === true  && <img src={logo} height={40} alt='BikeWalkKC Logo'/> }
          {this.props.home === false  && <div><Link to='/'><IconButton><ArrowBack /></IconButton></Link>&nbsp;</div> }
          <Typography variant='title'>
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
