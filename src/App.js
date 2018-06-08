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
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const theme = createMuiTheme({
  palette: {
    primary:blue
  },
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <AppBar
          position='static'
        >
          <Toolbar>
          <Typography variant="title">
            Community Dashboard
          </Typography>
            <Button>Dashboard</Button>
            <Button>Map</Button>
          </Toolbar>
        </AppBar>
        <br />
        <Grid container
          spacing={16}
          justify={'center'}
        >
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <p>
                  GO KC, KCMO’s $800 million infrastructure bond approved by voters
                  in 2017, includes $150 million for sidewalks over the next twenty years.
                  This graph tracks that investment, at a rate of approximately $7.5 million per year.
                  Source: GO KC and City Clerk Web sites.
                </p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                Hello
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      </ MuiThemeProvider>

    );
  }
}

export default App;
