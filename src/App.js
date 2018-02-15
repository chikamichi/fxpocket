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
    return (
      <div className="fxp">
        <Currency type='quote' currency='EUR' currencies={currencies} />
        <Currency type='counter' currency='USD' currencies={currencies} />
      </div>
    )
  }
}

export default App
