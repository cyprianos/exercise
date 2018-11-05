import {Component} from "react";
import React from "react";

export const SESSION_PROPERTY = "thisAuthIsNotVerySmart";
const TRUE_STRING = 'true';

export const AuthContext = React.createContext();

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    let self = this;
    this.state = {
      secretDB: {
        'admin': 'Password123'
      },
      users: new Map(),
      loggedIn: AuthProvider.hasAccess(),
      login(username, password) {
        if (this.secretDB[username] === password) {
          sessionStorage.setItem(SESSION_PROPERTY, TRUE_STRING);
          self.setState({
            loggedIn: true
          });
          return true;
        }
        return false;
      },
      logout: () => {
        if (AuthProvider.hasAccess()) {
          sessionStorage.removeItem(SESSION_PROPERTY);
          self.setState({
            loggedIn: false
          });
          return true;
        }
        return false;
      }
    };
  }

  static hasAccess() {
    if (sessionStorage.getItem(SESSION_PROPERTY) === TRUE_STRING) {
      return true;
    }
    return false;
  }

  render() {
    return <AuthContext.Provider value={{state: this.state}}>
      {this.props.children}
    </AuthContext.Provider>
  }
}