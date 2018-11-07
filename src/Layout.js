import React from "react";

import {Container} from "reactstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {connect} from "react-redux";

import {modalError} from './Modal/Modal.actions'
import AuthProvider, {AuthContext} from "./Auth/AuthProvider";

import Wall from "./Wall/Wall";
import Login from "./Login/Login";
import SecretRoute from "./Auth/SecretRoute";
import Details from "./Details/Details";

import Modal from "./Modal/Modal";
import NoMatch from "./NoMatch";

class Layout extends React.Component {
  render() {
    return (

      <div>
        {this.props.error &&
        <Modal/>
        }
        <AuthProvider>

          <BrowserRouter>
            <AuthContext.Consumer>

              {(auth) => (
                <Container className="main">
                  <h2>HSBC Exercise</h2>
                  <button onClick={() => {
                    return this.props.modalError('Fake Error!')
                  }}>Make Error!
                  </button>

                  <Switch>
                    <SecretRoute path="/details/:id" component={Details}/>
                    <SecretRoute path="/wall" component={Wall}/>
                    <SecretRoute exact path="/" component={Wall}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NoMatch}/>
                  </Switch>
                </Container>
              )}


            </AuthContext.Consumer>
          </BrowserRouter>
        </AuthProvider>
      </div>


    )
  }

}

const mapStateToProps = (state) => {
  return {
    error: state.modal.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    modalError: (message) => dispatch(modalError(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);