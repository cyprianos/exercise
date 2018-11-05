import React from 'react';
import ReactDOM from 'react-dom';

import {shallow} from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing by using enzyme', ()=> {
  const wrapper = shallow(<App/>);
  const headerElement = <h2>Wall Exercise</h2>;
  expect(wrapper.contains(headerElement)).toBe(true);
});