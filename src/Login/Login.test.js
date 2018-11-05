import React from 'react';
import {shallow} from 'enzyme';
import Login from "./Login";
import {Button} from 'reactstrap';

describe('login test suite',()=>{
  it('header is displayed on login form',() => {
    const wrapper = shallow(<Login/>);
    const headerElement = <h3>Login</h3>;
    expect(wrapper.contains(headerElement)).toBe(true);
  });

  it('login form has submit button',()=>{
    const wrapper = shallow(<Login/>);
    const submitButton = <Button>Submit</Button>;
    expect(wrapper.contains(submitButton)).toBe(true);
  });
});


