import React, { Component } from 'react';
import './App.css';
import SideNav from './components/sideNav';

import { Switch, Route, withRouter  } from 'react-router-dom'
import RegionalBikeFacilitiesChart from './infographics/regionalBikeFacilitiesChart.js';
import Dashboard from './dashboard.js';
import Bikeshare from './bikeshare.js';

import Home from './home.js';

import RegionalBikeMap from './infographics/regionalBikeMap.js';
import BikeShareHeatmap from './infographics/bikeShareHeatmap.js';

import Nav from './components/nav.js';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends Component {
/*
  constructor(props) {
    super(props);
    this.state = {title: this.props.location.pathname};
  }
  */
  dashboard() {
    return <Dashboard />
  }
  bikeshare() {
    return <Bikeshare />
  }
  home() {
    return <Home />
  }
  render() {
    var title = '';
    var home = true;
    /*
    if(this.props.location.pathname==='/regional-bike-map'){
      title = "Regional Bike Network"
      home = false;
    }
    if(this.props.location.pathname==='/regional-bike-chart'){
      title = "Regional Bike Facilities"
      home = false;
    }
    */
    return (
      <main>
        <Nav title={title} home={home} />
        <Switch>
          <Route path='/bike-facilities/regional-bike-map' component={RegionalBikeMap}/>
          <Route path='/bike-facilities/regional-bike-chart' component={RegionalBikeFacilitiesChart}/>
          <Route path='/bike-share/bike-share-heatmap' component={BikeShareHeatmap}/>

          <div className="wrapper">
            <SideNav />
            <div className="main">
              <Switch>
                <Route path='/bike-facilities/' component={this.dashboard}/>
                <Route path='/bike-share/' component={this.bikeshare}/>
                <Route path='/' component={this.home}/>
              </Switch>
              </div>
          </div>
          </Switch>
      </main>
    );
  }
}
export default withRouter(App);
