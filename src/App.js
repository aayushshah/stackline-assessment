import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import SimpleLineChart from './Components/Chart';
import SimpleTable from './Components/GenerateTable';

const styles = theme => ({
  root: {
    display: 'flex',
  },

  toolbar: {
    paddingRight: 24, 
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  title: {
    flexGrow: 1,
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },

  chartContainer: {
    marginLeft: -22,
  },

  tableContainer: {
    height: 320,
  },

  image: {
    width: 200,
    height: 200
  },

});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }


  async componentDidMount() {
    try {
      await axios.get('./Webdev_data2.json').then(response => { this.setChartData(response.data) })
        .catch(e => { console.log(e); });
    }
    catch (e) {
      if (e !== 'No data available') {
        alert(e);
      }
    }
  }
  
  setChartData(data) {
    this.setState({ chartData: data })
  }

  render() {
    const { classes } = this.props;
    const data = this.state.chartData;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar)}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              StackLine
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{ paper: classNames(classes.drawerPaper) }}
        >
          <div className={classes.appBarSpacer} />
          <div className={classes.appBarSpacer} />
          <List>
            <img className={classes.image} src={this.state.chartData.map(item => item.image)}/>
          </List>
            <Typography fontWeight="fontWeightLight"> {this.state.chartData.map(item => item.subtitle)} </Typography>
          <Divider />
          <Divider />
            <Typography fontWeight="fontWeightLight"> {this.state.chartData.map(item => item.tags)} </Typography>
          <Divider />
          <List>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Sales" />
              </ListItem>
            </div>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Retail Sales
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart chartData={data}/>
          </Typography>
          <div className={classes.appBarSpacer} />
          <div className={classes.tableContainer}>
            <SimpleTable chartData={data}/>
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);