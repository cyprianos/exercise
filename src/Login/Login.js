import React from "react";
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Login extends React.Component {
  render() {
    return (
      <Form>
        <h3>Login</h3>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input id="username" name="username" placeholder="Username...."/>
        </FormGroup>
        <FormGroup>
          <Label for="password" >Password</Label>
          <Input id="password" name="password" type="password" placeholder="Password..."/>
        </FormGroup>

        <Button>Submit</Button>

      </Form>
    )

  }
}