import React from 'react';
import App from './App';
import {Enzyme,shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure,wrapper } from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  const editor =shallow(<App/>) 
  expect(editor.find('AppBar').length).toEqual(1)
  expect(editor.find('RaisedButton').length).toEqual(2)
  expect(editor.find('TextField').length).toEqual(2)
  expect(editor.find('h1').length).toEqual(1)
});


it('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});