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
    .matches(/[a-z]/, 'Should match at least one lowercase letter')
    .matches(/[A-Z]/, 'Should match at least one uppercase letter')
    .matches(/[0-9]/, 'Should match at least one number')
});


export default class Login extends React.Component {
  render() {
    if (AuthProvider.hasAccess()) {
      return <Redirect to="/wall"/>
    }
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <Formik initialValues={{username: '', password: '', credentials:''}}
                  validationSchema={LoginFormValidationSchema}
                  validate={values => {
                    let errors = {};
                    return errors;
                  }}
                  onSubmit={(values, actions) => {
                    let success = auth.state.login(values.username, values.password);
                    if (!success) {
                      console.log('onsubmit', values, actions);
                      actions.setSubmitting(false);
                      actions.setFieldError("credentials", "Password does not match. Password hidden in placeholder:) ");
                      actions.setStatus({msg: 'Set some arbitrary status or data'});
                    }
                  }}
          >{({errors, touched, handleSubmit, handleChange, handleBlur}) => (
            <Form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input onChange={handleChange} onBlur={handleBlur} id="username" name="username" placeholder="admin"/>
                <ErrorMessage name="username">{msg => <Alert color="danger">{msg}</Alert>}</ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={handleChange} onBlur={handleBlur} id="password" name="password" type="password"
                       placeholder="Password123"/>
                <ErrorMessage name="password">{msg => <Alert color="danger">{msg}</Alert>}</ErrorMessage>
              </FormGroup>
              <FormGroup>
                <ErrorMessage name="credentials">{msg => <Alert color="danger">{msg}</Alert>}</ErrorMessage>
                <Button type="submit">Submit</Button>
              </FormGroup>


            </Form>
          )}

          </Formik>
        )}

      </AuthContext.Consumer>
    )

  }
}