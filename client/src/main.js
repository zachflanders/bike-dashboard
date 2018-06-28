import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter  } from 'react-router-dom'
import RegionalBikeFacilitiesChart from './infographics/regionalBikeFacilitiesChart.js';
import Dashboard from './dashboard.js';
import RegionalBikeMap from './infographics/regionalBikeMap.js';
import Nav from './components/nav.js'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.location.pathname};
  }
  dashboard() {
    return <Dashboard />
  }
  render() {
    var title = '';
    var home = true;
    if(this.props.location.pathname==='/regional-bike-map'){
      title = "Regional Bike Network"
      home = false;
    }
    if(this.props.location.pathname==='/regional-bike-chart'){
      title = "Regional Bike Facilities"
      home = false;
    }
    return (
      <main>
        <Nav title={title} home={home} />
        <Switch>
          <Route exact path='/' component={this.dashboard}/>
          <Route path='/regional-bike-map' component={RegionalBikeMap}/>
          <Route path='/regional-bike-chart' component={RegionalBikeFacilitiesChart}/>
        </Switch>
      </main>
    );
  }
}
export default withRouter(Main);
