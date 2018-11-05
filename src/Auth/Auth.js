export const SESSION_PROPERTY = "thisAuthIsNotVerySmart";
const TRUE_STRING = 'true';

export default class Auth {
  constructor(secretDB = {"admin": "password"}) {
    this.secretDB = secretDB;
  }

  login(username, password) {
    if (this.secretDB[username] === password) {
      sessionStorage.setItem(SESSION_PROPERTY, TRUE_STRING);
      return true;
    }
    return false;
  }

  static hasAccess() {
    if (sessionStorage.getItem(SESSION_PROPERTY) === TRUE_STRING) {
      return true;
    }
    return false;
  }

  static logout() {

    if (Auth.hasAccess()) {
      sessionStorage.removeItem(SESSION_PROPERTY);
      return true;
    }
    return false;

  }

}