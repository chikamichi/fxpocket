import React from 'react';
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
const hereafter = require('hereafter')

import App from './App'
import { responses, mockInitialApiCalls } from './setupTests'

hereafter.useJestExpect(expect);

function Scenario(app) {
  this.app = app

  this.widgets = () => this.app.update().find('.fxp-currency')

  this.editAmount = (widgetIdx, amount) => {
    const quoteWidget = this.widgets().at(widgetIdx)
    const amountInput = quoteWidget.find('.fxp-currency__amount')
    amountInput.simulate('change', {
      target: { value: 1 }
    })
  }

  this.editCurrency = (widgetIdx) => {
    const quoteWidget = this.widgets().at(widgetIdx)
    const currencySelector = quoteWidget.find('.fxp-currency__list')
    currencySelector.simulate('change', {
      target: { value: 'USD' }
    })
  }
}

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
        const step = new Scenario(app)
        step.editAmount(0,1)
      })
      expect(() =>
        app.find('.fxp-currency').at(1).find('.fxp-currency__amount').props().value
      ).toEqual(1.25)
    })()
  })

  it('reacts to the currency being edited', () => {
    return hereafter((expect, when) => {
      expect(() => app)
      when(() => {
        const step = new Scenario(app)
        step.editAmount(0,1)
        step.editCurrency(0,'USD')
      })
      expect(() =>
        app.find('.fxp-currency').at(0).find('.fxp-currency__amount').props().value
      ).toEqual(1)
      expect(() =>
        app.find('.fxp-currency').at(1).find('.fxp-currency__amount').props().value
      ).toEqual(1)
    })()
  })
})
