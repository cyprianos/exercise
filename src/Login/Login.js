import React from "react";
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';

import Auth from '../Auth/Auth';

const auth = new Auth();

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, actions) {
    console.log(values);
    const loggedIn = auth.login(values.username, values.password);
    if (!loggedIn) {
      actions.setErrors("dupa")
    }

    this.forceUpdate();

  }

  render() {
    return (
      <Formik initialValues={{username: 'x', password: 'z'}}
              validationSchema={LoginFormValidationSchema}
              validate={values => {
                let errors = {};
                return errors;
              }}
              onSubmit={this.handleSubmit}
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

    )

  }
}