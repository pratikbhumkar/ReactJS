import React from 'react';
import Payment from './Payment';
import {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<Payment/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('h1').length).toEqual(2)
  expect(editor.find('RaisedButton').length).toEqual(5)
});
it('renders correctly', () => {
  const tree = renderer
    .create(<Payment/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});