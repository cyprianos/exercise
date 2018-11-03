import React, {Component} from 'react';
import './App.css';
import {Container, Row, Col} from 'reactstrap';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Wall from './Wall/Wall';
import Login from './Login/Login';
import Home from './Home/Home';


export default class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Container className="main">
          <h2>Wall Exercise</h2>
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/wall"> Wall</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
            <Route exact path="/" component={Home}/>
            <Route path="/Home" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/wall" component={Wall}/>
        </Container>

      </BrowserRouter>
    );
  }
}
