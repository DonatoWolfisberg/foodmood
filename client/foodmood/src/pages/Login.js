import React from 'react';
var Router = require('react-router');

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Color from "../stores/configs/Color";

import HandleDataAction from "../actions/HandleDataAction";
import LoginInformationStore from "../stores/LoginInformationStore";

var color = Color.getColor();

const loginTitleStyle = {
  backgroundColor: color.primaryColor,
  padding: 10,
  color: "#fff",
};

const loginTitleHStyle = {
  marginBottom: 0,
};

const loginTitleButton = {
  float: "right",
};

const loginInputStyle = {
  width: "90%",
  marginLeft: "3%"
};

const underlineStyle = {
  color: color.primaryColorDark,
}

const floatingLabelStyle = {
  color: color.primaryColorDark,
  fontSize: 18
}

const submitButtonOverlayStyle = {
  backgroundColor: color.accentColor,
}

const submitButtonlabelStyle = {
  color: "#fff",
}

const submitButtonStyle = {
  width: "30%",
  marginLeft: "63%",
  marginBottom: "10px",
  marginTop: "10px",
}

const errorMsgstyle = {
  color: "red"
}

var Home = React.createClass({
  getInitialState: function() {
    return {
      errorMessageUsername: "",
      errorMessagePassword: ""
    };
  },

  componentWillMount() {
    LoginInformationStore.on("loginError", this.sendErrorMsg);
  },

  componentWillUnmount() {
    LoginInformationStore.removeListener("loginError", this.sendErrorMsg);
  },

  sendErrorMsg() {
    document.getElementById("errorTextField").innerHTML = "Deine Angeben sind ungültig!";
  },
  redirectToRegister() {
    Router.hashHistory.push('/register');
  },

  handleSubmit() {

    var password = document.getElementById("passwordField").value;
    var username = document.getElementById("usernameField").value;

    var okay = true;

    if(!password) {
      okay = false;
      this.setState({
        errorMessagePassword: "Bitte Passwort eingeben"
      });
    }
    else {
      this.setState({
        errorMessagePassword: ""
      });
    }

    if(!username) {
      okay = false;
      this.setState({
        errorMessageUsername: "Bitte Benutzername eingeben"
      });
    }
    else {
      this.setState({
        errorMessageUsername: ""
      });
    }

    if(okay) {
      this.sendLogin(username, password);
    }

  },
  sendLogin(username = '', password = '') {

    var data = {
      type:"LOGIN",
      username:username,
      password:password
    };
  HandleDataAction.sendData(data);
  },

  handleKeyPress(e) {
    if(e.charCode===13){
      this.handleSubmit();
    }
  },

  render() {
    return (
      <Paper zDepth={1} id="login">
        <div>
          <Paper zDepth={1} style={loginTitleStyle}>
            <h1 style={loginTitleHStyle}>Login</h1>
            <FloatingActionButton secondary={true} style={loginTitleButton} onTouchTap={this.redirectToRegister}>
              <ContentAdd />
            </FloatingActionButton>
            <p id="errorTextField" style={errorMsgstyle}></p>
          </Paper>
          <TextField
            style={loginInputStyle}
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
            className="loginInput"
            hintText="Max"
            floatingLabelText="Benutzername"
            type="text"
            errorText={this.state.errorMessageUsername}
            id="usernameField"
          /><br />
          <TextField
            style={loginInputStyle}
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
            onKeyPress={this.handleKeyPress}
            className="loginInput"
            hintText="geheimespasswort"
            floatingLabelText="Passwort"
            type="password"
            errorText={this.state.errorMessagePassword}
            id="passwordField"
          /><br />
          <RaisedButton
            onTouchTap={this.handleSubmit}
            style={submitButtonStyle}
            overlayStyle={submitButtonOverlayStyle}
            labelStyle={submitButtonlabelStyle}
            id="submitButton"
            type="submit"
            label="Anmelden"
          />
        </div>
      </Paper>
    );
  }
});

module.exports = Home;
