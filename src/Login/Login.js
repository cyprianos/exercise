import React from "react";
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';

import AuthProvider, {AuthContext} from '../Auth/AuthProvider';

const LoginFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too short username')
    .required('Required!'),
  password: Yup.string()
    .min(8, 'Too short password')
    .required('Required!')
});


export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (AuthProvider.hasAccess()) {
      return <Redirect to="/wall"/>
    }
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <Formik initialValues={{username: '', password: ''}}
                  validationSchema={LoginFormValidationSchema}
                  validate={values => {
                    let errors = {};
                    return errors;
                  }}
                  onSubmit={(values, actions)=>{auth.state.login(values.username, values.password)}}
          >{({errors, touched, handleSubmit, handleChange, handleBlur}) => (
            <Form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input onChange={handleChange} onBlur={handleBlur} id="username" name="username"/>
                <ErrorMessage name="username">{msg => <Alert color="danger">{msg}</Alert>}</ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={handleChange} onBlur={handleBlur} id="password" name="password" type="password"/>
                <ErrorMessage name="password">{msg => <Alert color="danger">{msg}</Alert>}</ErrorMessage>
              </FormGroup>

              <Button type="submit">Submit</Button>

            </Form>
          )}

          </Formik>
        )}

      </AuthContext.Consumer>
    )

  }
}