import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import blue from '@material-ui/core/colors/blue';
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
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RegionalBikeFacilitiesChart from './infographics/regionalBikeFacilitiesChart.js'
import RegionalBikeMap from './infographics/regionalBikeMap.js'

const theme = createMuiTheme({
  palette: {
    primary:blue
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{paddingTop:'16px'}}>
        <Grid fluid>
          <Row>
            <Col lg={2} md={3} sm={12}>
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
            </Col>
            <Col lg={10} md={9} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                <Card style={{paddingBottom:'16px'}}>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <MapIcon />
                      </Avatar>
                    }
                    action={
                        <Link to='/regional-bike-map' onClick={this.props.handleClick}>
                          <IconButton>
                            <FullscreenIcon />
                          </IconButton>
                        </Link>
                    }
                    title='Regional Bike Network'
                    subheader='Updated: June 6, 2018'
                  />
                  <RegionalBikeMap />
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
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <ChartIcon />
                        </Avatar>
                    }
                    action={
                      <Link to='/regional-bike-chart' onClick={this.props.handleClick}>
                        <IconButton>
                          <FullscreenIcon />
                          </IconButton>
                          </Link>
                    }
                    title='Regional Bike Facilities'
                    subheader='Updated: June 6, 2018'
                  />
                  <RegionalBikeFacilitiesChart />
                  <CardActions>
                    <IconButton size="small"><DownloadIcon /></IconButton>
                    <IconButton size="small"><ShareIcon /></IconButton>
                  </CardActions>
                </Card>
              </Col>
            </Row>
            </Col>
          </Row>
          </Grid>
        </div>
        <br />
      </ MuiThemeProvider>
    );
  }
  }
export default Dashboard;
