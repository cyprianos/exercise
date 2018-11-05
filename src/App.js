import React, {Component} from 'react';
import './App.css';
import {Container, Row, Col} from 'reactstrap';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import SecretRoute from './Auth/SecretRoute';
import Auth from './Auth/Auth';

import Wall from './Wall/Wall';
import Login from './Login/Login';
import Home from './Home/Home';



export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    Auth.logout()
    this.forceUpdate();
  }

  render() {

    return (

      <BrowserRouter>
        <Container className="main">
          <h2>Wall Exercise</h2>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              {Auth.hasAccess() && <li><Link to="/wall"> Wall</Link></li> }
              {!Auth.hasAccess() && <li><Link to="/login">Login</Link></li> }
              {Auth.hasAccess() && <li><button onClick={this.handleLogout}>Logout</button></li> }
            </ul>
          </nav>
            <Route exact path="/" component={Home}/>
            <Route path="/Home" component={Home}/>
            <Route path="/login" component={Login}/>
            <SecretRoute path="/wall" component={Wall}/>
        </Container>

      </BrowserRouter>
    );
  }
}
