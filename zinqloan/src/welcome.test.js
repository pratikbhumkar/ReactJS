import React from 'react';
import Welcome from './welcome';
import {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<Welcome/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('h1').length).toEqual(1)
  expect(editor.find('h4').length).toEqual(1)
});
