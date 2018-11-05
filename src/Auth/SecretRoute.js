import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';



export default function SecretRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
       Auth.hasAccess() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}