import React from 'react';
import Credit from './Credit';
import {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<Credit/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('RaisedButton').length).toEqual(3)
  expect(editor.find('img').length).toEqual(2)
});
