import React from "react";
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const LoginFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too short username')
    .required('Required!'),
  password: Yup.string()
    .min(8, 'Too short password')
    .required('Required!')
});


export default class Login extends React.Component {
  render() {
    return (
      <Formik initialValues={{username: 'x', password: 'z'}}
              validationSchema={LoginFormValidationSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2));
                //   actions.setSubmitting(false);
                // }, 400);
              }}
      >{({errors, touched, handleSubmit, handleChange}) => (
        <Form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input onChange={handleChange} id="username" name="username" />
            <ErrorMessage name="username">{msg => <div>{msg}</div>}</ErrorMessage>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input onChange={handleChange} id="password" name="password" type="password" />
            <ErrorMessage name="password">{msg => <div>{msg}</div>}</ErrorMessage>
          </FormGroup>

          <Button type="submit">Submit</Button>

        </Form>
      )}

      </Formik>

    )

  }
}