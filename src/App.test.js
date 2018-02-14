import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

describe('layout', () => {
  it('looks like the registered snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
