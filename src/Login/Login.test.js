import React from 'react';
import {mount, shallow} from 'enzyme';
import {Button} from 'reactstrap'
import Login from "./Login";

import { expect } from 'chai'

describe('login test suite',()=>{
  it('header is displayed on login form',() => {
    const wrapper = mount(<Login />);
    expect(wrapper.contains(<h3>Login</h3>)).to.equal(true);
  });

  it('login form has exactly one submit button',()=>{
    const wrapper = mount(<Login />);
    console.log(wrapper.html());
    expect(wrapper.find('button')).to.have.lengthOf(1);

  });
});


