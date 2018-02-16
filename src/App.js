import React, { Component } from 'react'
import 'whatwg-fetch'

import Currency from './Currency'
import { round } from './utils'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencies: {},
      widgets: ['EUR', 'USD'],
      base: {
        amount: undefined,
        currency: undefined
      }
    }
  }

  onAmountEdited(payload) {
    this.setState({base: payload})
  }

  onCurrencyEdited(payload) {
    const idx = payload.uuid
    const newState = [
      ...this.state.widgets.slice(0, idx),
      payload.currency,
      ...this.state.widgets.slice(idx+1)
    ]
    this.setState({widgets: newState})
  }

  convertAmounts() {
    const base = this.state.base
    if (!base.amount || !base.currency) return {}
    return this.currenciesList().reduce((acc, currency) => {
      let amount
      if (base.currency === currency)
        amount = base.amount
      else
        amount = base.amount * this.state.currencies[base.currency][currency]
      acc[currency] = round(amount, 2)
      return acc
    }, {})
  }

  currenciesList() {
    const currencies = Object.keys(this.state.currencies)
    return currencies.sort((a, b) => a.localeCompare(b))
  }

  fetchCurrencies() {
    Promise.all(this.state.widgets.map((currency) => {
      // Beware: as fetch().then() returns a Promise (for chainability), it must
      // be part of Promise.all().
      return fetch(`https://api.fixer.io/latest?base=${currency}`)
        .then(response => response.json())
    }))
    .then(this.updateCurrencies)
  }

  updateCurrencies = (data) => {
    const extractRates = (acc, val) => {
      acc[val.base] = val.rates
      return acc
    }
    const updatedCurrencies = data.reduce(extractRates, {})
    this.setState({currencies: updatedCurrencies})
  }

  componentDidMount() {
    this.fetchCurrencies()
  }

  render() {
    const currencies = this.currenciesList()
    const cb = {
      onAmountEdited: this.onAmountEdited.bind(this),
      onCurrencyEdited: this.onCurrencyEdited.bind(this)
    }
    const amounts = this.convertAmounts()
    const widgets = this.state.widgets.map((currency, i) => {
      return <Currency
        key={i} // key is simply the position in this.state.widgets
        uuid={i}
        type='quote' // TODO: remove this type prop
        amount={amounts[currency]}
        currency={currency}
        currencies={currencies}
        onAmountEdited={cb.onAmountEdited}
        onCurrencyEdited={cb.onCurrencyEdited} />
    })
    return (
      <div className="fxp">
        {widgets}
      </div>
    )
  }
}

export default App
