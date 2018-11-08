import React from 'react';
import ReactDOM from 'react-dom';

import {shallow} from 'enzyme';
import App from './App';
import Layout from './Layout';

const expect = require('chai').expect;

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders Layout by using enzyme', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.contains(<Layout />)).to.equal(true);
  });
});

