import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './AuthProvider';



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