import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />)
});

afterEach(() => {
  jest.clearAllMocks();
});

test('app renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it("should match initial layout snapshot", () => {
  expect(wrapper.getElements()).toMatchSnapshot();
});


it('renders an owner input', () => {
  expect(wrapper.find('#owner').length).toEqual(1)
})

it('renders an repo input', () => {
  expect(wrapper.find('#repo').length).toEqual(1)
})

it('renders an event type select dropdown', () => {
  expect(wrapper.find('#eventType').length).toEqual(1)
})

it('should update state of owner input', () => {
  const stateSetter = jest.fn()
  jest.spyOn(React, 'useState')
  //Simulate that mode state value was set to 'new mode value'
  .mockImplementation(stateValue => [stateValue='seantayler', stateSetter])
})

it('should update state of repo input', () => {
  const stateSetter = jest.fn()
  jest.spyOn(React, 'useState')
  //Simulate that mode state value was set to 'new mode value'
  .mockImplementation(stateValue => [stateValue='github-events', stateSetter])
})

it('should list events after button click', () => {
  expect(wrapper.find('#events').length).toBeGreaterThan(0)
})

// it("displays dropdown options", () => {
//   expect(wrapper.find("eventType")).toHaveLength(15);
// });


// it("loads the events", () => {
//   expect(props.fetchEvents).toHaveBeenCalled();
// });

// it('should contain a method called "handleClick"', () => {
//   const wrapper = shallow(<App />)
//   expect(typeof wrapper.instance().handleClick).toBe('function')
// })