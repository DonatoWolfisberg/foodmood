function getUserIDByUsername(username, callbackFunc, sqlconnection) {

  sqlconnection.query('SELECT `userID` FROM `user` WHERE `username` = ?', [username], function(err, rows, result) {
    if(err) {
      callbackFunc(false, "SQL_ERROR")
    }
    else if(typeof rows[0] === 'undefined') {
      callbackFunc(false, "USER_NOTFOUND")

    } else {
      callbackFunc(true, "USER_FOUND", rows[0]["userID"])
    }
  });
}


module.exports = getUserIDByUsername;
