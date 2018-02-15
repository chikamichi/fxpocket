import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  var response

  beforeEach(() => {
    response = {
      rates: {
        EUR: 1,
        USD: 1.25
      }
    }
    fetch.mockResponse(JSON.stringify(response))
  })

  describe('layout', () => {
    it('looks like the registered snapshot', () => {
      const wrapper = shallow(<App />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('currencies list', () => {
    it('is populated before the component renders', done => {
      const wrapper = shallow(<App />)
      setImmediate(() => {
        const expected = Object.keys(response.rates)
        expect(wrapper).toHaveState('currencies', expected)
        done()
      }, 0)
    })
  })
})
