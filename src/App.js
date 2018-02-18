import React, { Component } from 'react'

import Currency from './Currency'
import { INITIAL_STATE, convertAmount, convertAmounts } from './utils'
import Fixer from './fixer'
import './App.css'

/*
 * App — a container component for the currency converter.
 *
 * Responsible for converting between base and quote currencies, and displaying
 * so-called "currency widgets". The first currency widget in the list defines
 * what the base currency is, subsequent widgets map to quote currencies.
 * @see https://www.investopedia.com/terms/b/basecurrency.asp
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  // User edited a currency widget's amount.
  // Side-effect depends on whether we're dealing with the base currency or not:
  // - base widget edited => replace baseAmount with raw new value
  // - quote widget edited => replace baseAçount with converted value
  onAmountEdited(payload) {
    let newBaseAmount
    if (payload.uuid === 0)
      newBaseAmount = payload.amount
    else
      newBaseAmount = this.convertAmount(payload.amount, this.state.widgets[payload.uuid], this.state.widgets[0])
    this.setState({baseAmount: newBaseAmount})
  }

  // User edited a currency widget's currency.
  onCurrencyEdited(payload) {
    const idx = payload.uuid
    const newWidgetsState = [
      ...this.state.widgets.slice(0, idx),
      payload.currency,
      ...this.state.widgets.slice(idx+1)
    ]
    this.setState({
      widgets: newWidgetsState
    })
  }

  // Upon the App being mounted, fetch supported currencies as well as
  // conversion rates before marking the component as ready.
  componentDidMount() {
    Fixer.connect().then(fixer => {
      this.fixer = fixer
      this.convertAmount = convertAmount(fixer)
      this.convertAmounts = convertAmounts(fixer)
      this.setState({init: true})
    })
  }

  render() {
    if (!this.state.init) return <div className='fxp-loading'></div>
    const currencies = this.fixer.currencies
    const cb = {
      onAmountEdited: this.onAmountEdited.bind(this),
      onCurrencyEdited: this.onCurrencyEdited.bind(this)
    }
    const amounts = this.convertAmounts({
      amount: this.state.baseAmount,
      currency: this.state.widgets[0],
      currencies: this.state.widgets
    })
    const widgets = this.state.widgets.map((currency, i) => {
      return <Currency
        key={i} // key is simply the position in this.state.widgets
        uuid={i}
        amount={amounts[currency]}
        currency={currency}
        currencies={currencies}
        onAmountEdited={cb.onAmountEdited}
        onCurrencyEdited={cb.onCurrencyEdited} />
    })
    return (
      <div className="fxp-app">
        {widgets}
      </div>
    )
  }
}

export default App
