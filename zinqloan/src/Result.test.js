import React from 'react';
import Result from './Result';
import {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<Result/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('h1').length).toEqual(2)
  expect(editor.find('RaisedButton').length).toEqual(1)
});
it('renders correctly', () => {
  const tree = renderer
    .create(<Result/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});