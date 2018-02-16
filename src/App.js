import React, { Component } from 'react'
import 'whatwg-fetch'

import Currency from './Currency'
import { round } from './utils'
import Fixer from './fixer'
import './App.css'

const INITIAL_STATE = {
  // Keeps track of app's startup process.
  init: false,
  // A list of currency widgets to display at startup.
  widgets: ['EUR', 'USD'],
  // Keeps track of user intents.
  base: {
    amount: undefined,
    currency: undefined
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onAmountEdited(payload) {
    this.setState({base: payload})
  }

  onCurrencyEdited(payload) {
    const idx = payload.uuid
    const newWidgetsState = [
      ...this.state.widgets.slice(0, idx),
      payload.currency,
      ...this.state.widgets.slice(idx+1)
    ]
    const newBaseState = {
      amount: payload.amount,
      currency: payload.currency
    }
    this.setState({
      widgets: newWidgetsState,
      base: newBaseState
    })
  }

  convertAmounts() {
    const base = this.state.base
    if (!base.amount || !base.currency) return {}
    return this.fixer.currencies.reduce((acc, currency) => {
      let amount
      if (base.currency === currency)
        amount = base.amount
      else
        amount = base.amount * this.fixer.rates[base.currency][currency]
      acc[currency] = round(amount, 2)
      return acc
    }, {})
  }

  componentDidMount() {
    Fixer.connect().then(fixer => {
      this.fixer = fixer
      this.setState({init: true})
    })
  }

  render() {
    if (!this.state.init) return <p>loading app</p>
    const currencies = this.fixer.currencies
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
