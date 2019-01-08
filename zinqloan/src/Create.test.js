import React from 'react';
import Create from './Create';
import {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<Create/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('TextField').length).toEqual(7)
  expect(editor.find('RaisedButton').length).toEqual(1)
  expect(editor.find('AppBar').length).toEqual(1)
});
it('renders correctly', () => {
  const tree = renderer
    .create(<Create/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});