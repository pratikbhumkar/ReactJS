import React from 'react';
import Income from './Income';
import {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<Income/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('RaisedButton').length).toEqual(2)
  expect(editor.find('TextField').length).toEqual(4)
});
it('renders correctly', () => {
  const tree = renderer
    .create(<Income/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});