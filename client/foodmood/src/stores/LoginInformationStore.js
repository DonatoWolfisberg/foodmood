import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import setCookie from "../util/setCookie"

class LoginInformationStore extends EventEmitter {
  constructor() {
    super()
    this.sessionKey = 0;
  }

  setsessionKey(newsessionKey) {
    this.sessionKey = newsessionKey;
    setCookie("sessionKey", this.sessionKey, 1);
  }

  handleActions(action) {
    // warnung für kein default case ausschalten
    // eslint-disable-next-line
    switch(action.type) {
      case "NEW_SESSIONKEY":
        this.setsessionKey(action.sessionKey);
        this.emit("newsessionKey");
        break;
      case "LOGIN_ERROR":
        this.emit("loginError");
        break;
    }
  }
}

const loginInformationStore = new LoginInformationStore();
dispatcher.register(loginInformationStore.handleActions.bind(loginInformationStore));

export default loginInformationStore;
