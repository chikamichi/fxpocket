import React from 'react'
import { mount } from 'enzyme'
const hereafter = require('hereafter')

import App from './App'

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
    app = mount(<App />)
  })

  it('reacts to amount being edited', () => {
    return hereafter((expect, when) => {
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
