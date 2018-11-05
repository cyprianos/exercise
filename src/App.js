import React, {Component} from 'react';
import './App.scss';
import {Container, Row, Col} from 'reactstrap';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import SecretRoute from './Auth/SecretRoute';
import AuthProvider, {AuthContext} from './Auth/AuthProvider';

import Wall from './Wall/Wall';
import Login from './Login/Login';
import Home from './Home/Home';
import Details from './Details/Details';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <AuthContext.Consumer>
            {(auth) => (
              <Container className="main">

                <h2>Wall Exercise</h2>
                <nav>
                  <ul>
                    <li><Link to="/home">Home</Link></li>
                    {auth.state.loggedIn && <li><Link to="/wall"> Wall</Link></li>}
                    {!auth.state.loggedIn && <li><Link to="/login">Login</Link></li>}
                    {auth.state.loggedIn && <li>
                      <button onClick={()=>{auth.state.logout();}}>Logout</button>
                    </li>}
                  </ul>
                </nav>
                <Route exact path="/" component={Home}/>
                <Route path="/Home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/details/:id" component={Details}/>
                <SecretRoute path="/wall" component={Wall}/>

              </Container>
            )}

          </AuthContext.Consumer>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}
