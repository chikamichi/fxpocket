import React from 'react';
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
const hereafter = require('hereafter')

import App from './App'
import { responses, mockInitialApiCalls } from './setupTests'

hereafter.useJestExpect(expect);

// End-to-end tests aka. integration tests for the App.
describe('<App />', () => {
  var app

  beforeEach(() => {
    mockInitialApiCalls()
    app = mount(<App />)
  })

  it('reacts to amount being edited', () => {
    return hereafter((expect, when) => {
      // For the App initially asynchronously fetches the currencies rates, its
      // children components are not synchronously populated. The following
      // no-op expectation ("app") is required to bootstrap the app within
      // hereafter asynchronous stack. Use it in conjunction with .update()
      // to access the initial state resulting from the initial async fetch.
      expect(() => app)
      when(() => {
        const widgets = app.update().find('.fxp-currency')
        const quoteWidget = widgets.at(0)
        const amountInput = quoteWidget.find('.fxp-currency__amount')
        amountInput.simulate('change', {
          target: { value: 1 }
        })
      })
      expect(() =>
        app.find('.fxp-currency').at(1).find('.fxp-currency__amount').props().value
      ).toEqual(1.25)
    })()
  })
})
