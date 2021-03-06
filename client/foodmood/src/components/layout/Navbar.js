import React from 'react';
import AppBar from 'material-ui/AppBar';

var Router = require('react-router');

import LoggedIn from './navbar/LoggedIn'
import LoggedOut from './navbar/LoggedOut'

import LoginInformationStore from "../../stores/LoginInformationStore";

import Color from "../../stores/configs/Color";

var color = Color.getColor();


const navbartStyle = {
  backgroundColor: color.primaryColor,
  position: 'fixed',
  top: 0,
};

/**
 *
 * Top navigation
 *
 */
var Navbar = React.createClass({
  getInitialState: function() {
    return {
      logedIn: false,
      username: "",
    };
  },

  componentWillMount() {
    LoginInformationStore.on("loginState", this.changelogedInState);
  },

  componentWillUnmount() {
    LoginInformationStore.removeListener("loginState", this.changelogedInState);
  },

  changelogedInState() {
    this.setState({
      logedIn: LoginInformationStore.getlogedInState(),
      username: LoginInformationStore.getUsername(),
    });
  },

  changeSidebarState() {
    this.props.changeSidebarState();
  },

  linkToHomePage() {
    Router.hashHistory.push('/home')
  },

  render() {
    return (
      <AppBar
        title="FoodMood"
        onTitleTouchTap={this.linkToHomePage}
        style={navbartStyle}
        zDepth={2}
        onLeftIconButtonTouchTap={this.changeSidebarState}
        iconElementRight={this.state.logedIn ? <LoggedIn username={this.state.username}/> : <LoggedOut />}/>
    );
  }
});

module.exports = Navbar;
