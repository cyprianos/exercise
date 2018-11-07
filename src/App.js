import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';

import './App.scss';

import SecretRoute from './Auth/SecretRoute';
import AuthProvider, {AuthContext} from './Auth/AuthProvider';


import Wall from './Wall/Wall';
import Login from './Login/Login';
import Home from './Home/Home';
import Details from './Details/Details';

import RootReducer from './Store/Store.model';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composeEnhancers(applyMiddleware(Thunk)));

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
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
                        <button onClick={() => {
                          auth.state.logout();
                        }}>Logout
                        </button>
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
      </Provider>
    );
  }
}
