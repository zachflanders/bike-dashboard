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
import Typography from '@material-ui/core/Typography';
import RegionalBikeFacilitiesChart from './infographics/regionalBikeFacilitiesChart.js'
import RegionalBikeMap from './infographics/regionalBikeMap.js'
import BikeModeShare from './infographics/bikeModeShare.js'
import BikeShareHeatmap from './infographics/bikeShareHeatmap.js'



const theme = createMuiTheme({
  palette: {
    primary:blue
  },
});

class Bikeshare extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>

              <div className="item">
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <MapIcon />
                      </Avatar>
                    }
                    action={
                        <Link to='/bike-share/bike-share-heatmap' onClick={this.props.handleClick}>
                          <IconButton>
                            <FullscreenIcon />
                          </IconButton>
                        </Link>
                    }
                    title='Bike Share Heatmap'
                  />
                  <BikeShareHeatmap />
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
                </div>




        <br />
      </ MuiThemeProvider>
    );
  }
  }
export default Bikeshare;
