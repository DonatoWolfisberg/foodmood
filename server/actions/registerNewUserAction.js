// Async
const doesUserExist = require('../functionsAsync/doesUserExist');
const makeNewUser = require('../functionsAsync/makeNewUser');

//sync
const isValid = require('../functionsSync/isValidRegisterInput');

var GLOBsqlconnection;
var GLOBconnection;

var GLOBusername;
var GLOBname;
var GLOBlastname;
var GLOBpassword;


function registerNewUserAction(userInfo, sqlconnection, connection) {
  GLOBsqlconnection = sqlconnection;
  GLOBconnection    = connection;

  GLOBusername      = userInfo.username;
  GLOBname          = userInfo.name;
  GLOBlastname      = userInfo.lastname;
  GLOBpassword      = userInfo.password;

  if(isValidaRegisterInput(GLOBusername, GLOBname, GLOBlastname, GLOBpassword)) {
    doesUserExist(username, registerNewUserAction2, GLOBsqlconnection);
  }
  else {
    GLOBconnection.sendUTF(JSON.stringify({type : "REGISTRATION_ERROR", errormessage : "INVALID INPUTS"}));
  }
}

function registerNewUserAction2(result) {
  if(result == 0) {
    makeNewUser(userInfo, registerNewUserAction3, GLOBsqlconnection);
  }
  else {
    GLOBconnection.sendUTF(JSON.stringify({type : "USER_TAKEN", content : true}));
  }
}

function registerNewUserAction3() {

}

module.exports = registerNewUserAction;
