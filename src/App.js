import React, { Component } from 'react'
import 'whatwg-fetch'

import Currency from './Currency'
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

  convertAmounts() {
    const base = this.state.base
    if (!base.amount || !base.currency) return {}
    return this.currenciesList().reduce((acc, currency) => {
      if (base.currency === currency)
        acc[currency] = base.amount
      else
        acc[currency] = base.amount * this.state.currencies[base.currency][currency]
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
    const cb = this.onAmountEdited.bind(this)
    const amounts = this.convertAmounts()
    return (
      <div className="fxp">
        <Currency type='quote' amount={amounts.EUR} currency='EUR' currencies={currencies} onAmountEdited={cb} />
        <Currency type='counter' amount={amounts.USD} currency='USD' currencies={currencies} onAmountEdited={cb} />
      </div>
    )
  }
}

export default App
